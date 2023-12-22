import api from './APIclient.js';
import { createEvent } from './createPurchaseEvent.js';

const container = document.querySelector( '#upcomingEvents' );

// get upcoming events
api.getEvents().then( events => {
    for ( const event of events ) {
        const div = createEvent( event, 'u' );
        container.append( div );
    }
}).catch( () => {
    location.href = './guest';
});
