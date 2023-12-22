import api from './APIclient.js';
import { createEvent } from './createEvent.js';

const container = document.querySelector( '#history' );

// get event history
api.getCurrentUserPastEvents().then( events => {
    if ( events.length ) {
        for ( const event of events ) {
            const div = createEvent( event, 'h' );
            container.append( div );
        }
    } else {
        const p = document.createElement( 'p' );
        p.textContent = 'You do no have any old tickets.';
        container.append( p );
    }
}).catch( () => {
    location.href = './guest';
});
