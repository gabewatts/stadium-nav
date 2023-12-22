import api from './APIclient.js';
import { createEvent } from './createEvent.js';

const container = document.querySelector( '#upcomingEvents' );

// get upcoming events
api.getEvents().then( events => {
    for ( const event of events ) {
        const div = createEvent( event );
        container.append( div );
    }
}).catch( (err) => {
    console.log( err );
});
