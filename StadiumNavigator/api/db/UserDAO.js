const crypto = require( 'crypto' );
const db = require('./DBConnection');
const User = require('./models/User');
const Ticket = require('./models/Ticket');
const Event = require('./models/Event');

async function getUser(username) {
    return db.query('SELECT * FROM user WHERE usr_username=?', [username]).then(({results}) => {
        const user = new User(results[0]);
        if (user) {
            return user;
        }
        else {
            throw new Error("User not found");
        }
    });
}

async function getUserById(userId) {
    return db.query('SELECT * FROM user WHERE usr_id=?', [userId]).then(({results}) => {
        const user = new User(results[0]);
        if (user) {
            return user;
        }
        else {
            throw new Error("User not found");
        }
    });
}

async function getUserEvents(userId) {
    return db.query('SELECT * FROM event \
            JOIN ticket ON event.evt_id=ticket.evt_id \
            JOIN venue ON venue.ven_id=event.ven_id \
            WHERE ticket.usr_id=?',
            [userId]).then(({results}) => {
        const events = results.map( res => new Event( res ) );
        // get unique events only
        let ids = [];
        return events.filter( event => {
            if ( ids.find( id => id == event.id ) )
                return false;
            ids.push( event.id );
            return true;
        } );
    });
}

//login
async function getUserByCredentials(username, password) {
    return db.query('SELECT * FROM user WHERE usr_username=?', [username]).then(({results}) => {
        const user = new User(results[0]);
        if (user) {
            return user.validatePassword(password);
        }
        else {
            throw new Error("User not found");
        }
    });
}

async function createUser(user) {
    let newSalt = crypto.randomBytes(64);
    let saltHex = newSalt.toString('hex');

    let computedPassword = await new Promise( (resolve, reject) => {
        crypto.pbkdf2(user.password, saltHex, 100000, 64, 'sha512', (err, derivedKey) => {
            if ( err ) {
                reject( "Error: " + err.message );
                return;
            }

            const digest = derivedKey.toString( 'hex' );
            digest ? resolve( digest ) : reject ( 'Error computing password.' );
        });
    });

    // generate a random avatar
    let randomString = '';
    const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = Math.floor( Math.random() * 15 ) + 10;
    while ( length-- > 0 )
        randomString += validChars.charAt( Math.floor( Math.random() * validChars.length ) );
    const avatar = `https://robohash.org/${randomString}.png?size=64x64&set=set1&bgset=any`;

    return db.query('INSERT INTO user (usr_first_name, usr_last_name, usr_username, usr_password, usr_salt, usr_avatar) VALUES (?, ?, ?, ?, ?, ?)',
    [user.first_name, user.last_name, user.username, computedPassword, saltHex, avatar]).then(({results}) => {
        if (results.insertId) {
            return getUserById(results.insertId);
        }
    })
}

async function updateUser(id, updatedUser) {
    return db.query('UPDATE user SET usr_username=?, usr_first_name=?, usr_last_name=?, usr_avatar=? WHERE usr_id=?', [updatedUser.username, updatedUser.first_name, updatedUser.last_name, updatedUser.avatar, id])
        .then( ({results}) => {
            if ( results.affectedRows == 1 && results.warningCount == 0 )
                return getUserById( id );
            throw new Error( "Oops! Something went wrong." );
        }).catch( () => {
            throw new Error( "Oops! Something went wrong." );
    });
}

async function updatePassword(id, password, new_password) {
    // validate password
    const user = await db.query('SELECT * FROM user WHERE usr_id=?', [id]).then(async ({results}) => {
        const user = new User(results[0]);
        if ( user ) {
            const tmpUser = await user.validatePassword( password );
            if ( tmpUser.id !== user.id )
                throw new Error( 'Oops! Invalid password.' );

            return tmpUser;
        }
        throw new Error( 'Oops!. User not found.');
    });
    if ( !user )
        throw new Error( 'Oops! Something went wrong.' );

    // create new salt and hash the password
    const salt = crypto.randomBytes( 64 ).toString( 'hex' );
    const computedPassword = await new Promise( (resolve, reject) => {
        crypto.pbkdf2(new_password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
            if ( err ) {
                reject( "Error: " + err.message );
                return;
            }

            const digest = derivedKey.toString( 'hex' );
            digest ? resolve( digest ) : reject ( 'Error computing password.' );
        });
    });

    // persist the new password and salt
    return db.query('UPDATE user SET usr_password=?, usr_salt=? WHERE usr_id=?', [computedPassword, salt, id])
        .then( ({results}) => {
            if ( results.affectedRows == 1 && results.warningCount == 0 )
                return getUserById( id );
            throw new Error( "Oops! Something went wrong." );
        }).catch( () => {
            throw new Error( "Oops! Something went wrong." );
    });
}

//active ticket functionality
async function setActiveTicket(userId, ticketId) {
    const ticket = await db.query('SELECT * FROM event \
            JOIN ticket ON ticket.evt_id=event.evt_id \
            JOIN venue ON venue.ven_id=event.ven_id \
            WHERE ticket.tkt_id=? AND ticket.usr_id=?', [ticketId, userId])
        .then(({results}) => {
            return new Ticket( results[ 0 ] );
        }).catch( () => {
            throw new Error( "Oops! Something went wrong." );
    });

    //update in the database
    return db.query('UPDATE user SET usr_active_ticket=? WHERE usr_id=?', [ticketId, userId]).then( ({results}) => {
        if ( results.affectedRows == 1 && results.warningCount == 0 )
            return ticket;
        throw new Error( "Oops! Something went wrong." );
    }).catch(() => {
        throw new Error("couldn't update active ticket");
    });
}

async function updateSettings( id, settings ) {
    if ( !id || settings.dark === undefined || settings.notify === undefined || settings.text === undefined )
        throw new Error( 'Oops! Something went wrong.' );
    return db.query( 'UPDATE user SET usr_stg_dark=?, usr_stg_notify=?, usr_stg_text=? WHERE usr_id=?', [settings.dark, settings.notify, settings.text, id] ).then( ({results}) => {
        if ( results.affectedRows == 1 && results.warningCount == 0 )
            return getUserById( id );
        throw new Error( 'Oops! Something went wrong.' );
    }).catch( () => {
        throw new Error( 'Oops! Something went wrong.' );
    });
}

async function search( value ) {
    const param = `%${value}%`;
    return db.query( 'SELECT * FROM event \
        JOIN venue ON venue.ven_id=event.ven_id \
        WHERE event.evt_name LIKE ? \
        OR event.evt_descr LIKE ? \
        OR venue.ven_name LIKE ? \
        OR venue.address_city LIKE ?', [param, param, param, param] ).then( ({results}) => {
            const events = results.map( res => new Event( res ) );
            if ( !events?.length )
                throw new Error( 'Oops!' );
            return events;
        }).catch( () => {
            throw new Error( 'Oops!' );
        });
}

module.exports = {
    getUser: getUser,
    getUserById: getUserById,
    login: getUserByCredentials,
    signup: createUser,
    getUserEvents: getUserEvents,
    updateUser: updateUser,
    updatePassword: updatePassword,
    setActiveTicket: setActiveTicket,
    updateSettings: updateSettings,
    search: search
};
