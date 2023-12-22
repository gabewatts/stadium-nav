const db = require('./DBConnection');
const Ticket = require('./models/Ticket');
const User = require('./models/User');
let EventDAO = require('./EventDAO');

async function getTickets()  {
    return db.query('SELECT * FROM ticket').then(({results}) => {
       return results.map(ticket => new Ticket(ticket)); ; 
    });
}

async function getTicket(ticketId) {
    return db.query('SELECT * FROM ticket \
            JOIN event ON event.evt_id=ticket.evt_id \
            JOIN venue ON venue.ven_id=event.ven_id \
            WHERE ticket.tkt_id=?', [ticketId]).then(({results}) => {
        if (results[0]) {
            return new Ticket(results[0]);
        }
    });
}

async function getTicketsByOwner(ownerId) {
    return db.query('SELECT * FROM ticket \
            JOIN event ON event.evt_id=ticket.evt_id \
            JOIN venue ON venue.ven_id=event.ven_id \
            WHERE ticket.usr_id=?', [ownerId]).then(({results}) => {
        return results.map(ticket => new Ticket(ticket));
    });
}

async function getTicketsByEvent(eventId) {
    db.query('SELECT * FROM ticket WHERE evt_id=?', [eventId]).then(({results}) => {
        return results.map(ticket => new Ticket(ticket)); ;
    });
}

async function getTicketsByVenue(venueId) {
    const tickets = this.getTickets();

    let ret = [];
    for (const ticket of tickets) {
        EventDAO.getEventById(ticket.eventId).then(event => {
            if (event.venueId == venueId) {
                ret.push(ticket);
            }
        });
    }
    return (ret);
}

async function createTicket( userId, eventId ) {
    const rand1to8 = Math.floor( Math.random() * 8 ) + 1;
    const seat = `tkt_${rand1to8}_seat.png`;
    const rows = 'ABCDEFGH';
    const rand1to500 = Math.floor( Math.random() * 500 ) + 1;
    const desc = `Section: ${rand1to500} at Row: ${rows.charAt(rand1to8 - 1)}`;
    const lots = [1, 3, 8];
    const lot = `tkt_${lots[ Math.floor( Math.random() * 3 ) ]}_lot.png`;
    return db.query('INSERT INTO ticket (usr_id, evt_id, tkt_seat_map, tkt_seat_desc, tkt_parking_map, tkt_qr_code, tkt_bar_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userId, eventId, seat, desc, lot, 'qrcode_github.ncsu.edu.png', 'barcode.png']).then(({results}) => {
        return getTicket(results.insertId);
    });
}

async function deleteTicket( userId, ticketId ) {
    return db.query( 'DELETE FROM ticket WHERE usr_id=? AND tkt_id=?', [userId, ticketId] ).then( ({results}) => {
        if ( results.affectedRows != 1 || results.warningCount != 0 )
            throw new Error();
    });
};

async function sendTicket( username, ticketId ) {
    const usernameParam = `${username}`;

    return db.query('UPDATE ticket SET usr_id=(SELECT usr_id FROM user WHERE usr_username LIKE ? LIMIT 1) WHERE tkt_id=?', [usernameParam, ticketId]).then(({results}) => {
        return results;
    }).catch( () => {
        throw new Error("Oops! couldn't send ticket.");
    });
}

module.exports = {
    getTickets: getTickets,
    getTicket: getTicket,
    getTicketsByOwner: getTicketsByOwner,
    getTicketsByVenue: getTicketsByVenue,
    getTicketsByEvent: getTicketsByEvent,
    createTicket: createTicket,
    deleteTicket: deleteTicket,
    sendTicket: sendTicket
};