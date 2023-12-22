const DARK_MODE_KEY = 'darkMode';
const NOTIFY_KEY = 'notifyMe';
const LARGE_TEXT_KEY = 'largeText';
const ACTIVE_TICKET_KEY = 'activeTicket';
const TICKETS_KEY = 'msn-tickets';
const DOWNLOADS_KEY = 'msn-downloads';

export default {
    start: () => {
        // dark mode
        if ( localStorage.getItem( DARK_MODE_KEY ) === '1' ) {
            document.documentElement.style.setProperty( '--text-color', '#ffffff' );
            document.documentElement.style.setProperty( '--background-color', '#202124' );
            document.documentElement.style.setProperty( '--forefront-color', '#355052' );
            document.documentElement.style.setProperty( '--primary-button-color', '#81c2c7' );
            document.documentElement.style.setProperty( '--secondary-button-color', '#343746' );
            document.documentElement.style.setProperty( '--accent-color', '#343746' );
            document.documentElement.style.setProperty( '--border-color', '#202124' );
            document.documentElement.style.setProperty( '--shadow-color', '#000000' );
            document.documentElement.style.setProperty( '--link-hover-color', '#4e7578' );
            document.documentElement.style.setProperty( '--divider-color', '#202124' );
        }

        // notifications
        if ( localStorage.getItem( NOTIFY_KEY ) === '1' ) {
            // TODO
            // ...

            console.log( 'notify me...' );
        }

        // large text
        if ( localStorage.getItem( LARGE_TEXT_KEY ) === '1' )
            document.documentElement.style.setProperty( 'font-size', '1.2em' );
    },

    updateSettings: ( user ) => {
        localStorage.setItem( DARK_MODE_KEY, user.stg_dark );
        localStorage.setItem( NOTIFY_KEY, user.stg_notify );
        localStorage.setItem( LARGE_TEXT_KEY, user.stg_text );
    },

    getDownloads: () => {
        const downloads = localStorage.getItem( DOWNLOADS_KEY );
        if ( !downloads ) {
            const none = '00000000';
            localStorage.setItem( DOWNLOADS_KEY, none );
            return none;
        }
        return downloads;
    },

    updateDownloads: ( index ) => {
        let downloads = localStorage.getItem( DOWNLOADS_KEY );
        downloads = downloads.substring( 0, index ) + '1' + downloads.substring( index + 1 );
        localStorage.setItem( DOWNLOADS_KEY, downloads );
    },

    setActiveTicket: ( ticketId ) => {
        localStorage.setItem( ACTIVE_TICKET_KEY, ticketId );
    },

    getActiveTicket: () => {
        const tickets = JSON.parse( localStorage.getItem( TICKETS_KEY ) );
        const id = localStorage.getItem( ACTIVE_TICKET_KEY );
        return tickets.find( ticket => ticket.id == id );
    },

    setTickets: ( tickets ) => {
        if ( tickets.length == 0 ) {
            localStorage.removeItem( ACTIVE_TICKET_KEY );
            localStorage.removeItem( TICKETS_KEY );
        } else {
            localStorage.setItem( TICKETS_KEY, JSON.stringify( tickets ) );
            const id = localStorage.getItem( ACTIVE_TICKET_KEY );
            if ( !tickets.find( ticket => ticket.id == id ) )
                localStorage.setItem( ACTIVE_TICKET_KEY, tickets[ 0 ].id );
        }
    },

    getTickets: () => {
        return JSON.parse( localStorage.getItem( TICKETS_KEY ) );
    },

    end: () => {
        localStorage.removeItem( DARK_MODE_KEY );
        localStorage.removeItem( NOTIFY_KEY );
        localStorage.removeItem( LARGE_TEXT_KEY );
        localStorage.removeItem( ACTIVE_TICKET_KEY );
        localStorage.removeItem( TICKETS_KEY );
        localStorage.removeItem( DOWNLOADS_KEY );
    }
}
