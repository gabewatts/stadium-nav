import HTTPclient from './HTTPclient.js';

export default {

    /*//////\\\\\\*\
    //User Routes\\
    \*\\\\\////////*/
    login: async ( username, password ) => {
        const data = {
            username: username,
            password: password
        };
        return HTTPclient.post( 'login', data );
    },

    logout: async () => {
        return HTTPclient.post( 'logout', {} );
    },

    register: async ( first, last, username, password ) => {
        const data = {
            first_name: first,
            last_name: last,
            username: username,
            password: password
        };
        return HTTPclient.post( 'register', data );
    },

    getUser: async () => {
        return HTTPclient.get( 'currentuser' );
    },

    getUserById: async (id) => {
        return HTTPclient.get( `users/${id}` );
    },

    getCurrentUserEvents: async () => {
        return HTTPclient.get( 'users/current/events' );
    },

    getCurrentUserUpcomingEvents: async () => {
        return HTTPclient.get( 'users/current/events/upcoming' );
    },

    getCurrentUserPastEvents: async () => {
        return HTTPclient.get( 'users/current/events/history' );
    },

    updateProfile: async ( first, last, username, avatar ) => {
        const data = {
            "first_name": first,
            "last_name": last,
            "username": username,
            "avatar": avatar
        };
        return HTTPclient.put( 'currentuser', data );
    },

    updatePassword: async ( password, updatedPassword ) => {
        const data = {
            "password": password,
            "new_password": updatedPassword
        };
        return HTTPclient.put( 'currentuser/password', data );
    },

    updateSettings: async ( darkMode, notifications, largeText ) => {
        const data = {
            "dark": darkMode,
            "notify": notifications,
            "text": largeText
        };
        return HTTPclient.put( 'currentuser/settings', data );
    },

    /*//////\\\\\\*\
    //Event  Routes\\
    \*\\\\\////////*/

    getEventById: async (id) => {
        return HTTPclient.get( `events/${id}` );
    },

    getEventDetails: async (id) => {
        return HTTPclient.get( `events/${id}/details` );
    },

    getEventsByVenue: async (id) => {
        return HTTPclient.get( `events/venues/${id}` );
    },

    // upcoming events
    getEvents: async () => {
        return HTTPclient.get( 'events/upcoming/all' );
    },

    createEvent: async(name, desc, id, date, map) => {

        const data = {
            name: name,
            description: desc,
            venue: id,
            date: date,
            map: map
        };

        return HTTPclient.post( 'events', data ).then( event => {
            //maybe some kind of success message or page
            return event;
        });
    },

    setActiveTicket: async ( ticketId ) => {
        const data = {
            ticketId: ticketId
        };

        return HTTPclient.put( 'currentuser/ticket', data );
    },

    searchEvents: async ( value ) => {
        return HTTPclient.get( 'events/search/' + value );
    },

    /*//////\\\\\\*\
    //Venue  Routes\\
    \*\\\\\////////*/
    getVenues: async () => {
        return HTTPclient.get( 'venues' );
    },

    getVenueById: async (id) => {
        return HTTPclient.get( `venues/${id}` );
    },

    getVenueByState: async (state) => {
        return HTTPclient.get( `venues?state=${state}` );
    },

    //address expects full length address, e.g. '404 Wolf Lane, Raleigh, NC, 27707'
    createVenue: async (name, address, city, state, map) => {
        const data = {
            name: name,
            address: address,
            city: city,
            state: state,
            map: map
        };

        return HTTPclient.post( 'venues', data ).then( venue => {
            //maybe some kind of success message or page
            return venue;
        });
    },

    /*//////\\\\\\*\
    //Ticket Routes\\
    \*\\\\\////////*/
    getTicketById: async (id) => {
        return HTTPclient.get( `tickets/${id}` ).then( ticket => {
            return ticket;
        });
    },

    getTicketsByOwner: async () => {
        return HTTPclient.get( 'currentuser/tickets' );
    },

    getTicketsByEvent: async (id) => {
        return HTTPclient.get( `tickets/events/${id}` );
    },

    getTicketsByVenue: async (id) => {
        return HTTPclient.get( `tickets/venues/${id}` );
    },

    getCurrentUserTickets: async () => {
        return HTTPclient.get( 'tickets/users/current/all' );
    },

    getCurrentUserUpcomingTickets: async () => {
        return HTTPclient.get( 'tickets/users/current/upcoming' );
    },

    getCurrentUserPastTickets: async () => {
        return HTTPclient.get( 'tickets/users/current/history' );
    },

    getCurrentUserTicketsByEvent: async (id) => {
        return HTTPclient.get( `tickets/users/current/events/${id}` );
    },

    createTicket: async ( eventId ) => {
        const data = {
            eventId: eventId
        };
        return HTTPclient.post( 'tickets', data );
    },

    deleteTicket: async ( ticketId ) => {
        return HTTPclient.delete( 'tickets/' + ticketId, );
    },

    sendTicket: async (ticketId, username) => {
        const data = {
            ticketId: ticketId,
            username: username
        }

        return HTTPclient.put('tickets', data);
    }
};
