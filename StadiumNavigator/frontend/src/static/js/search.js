import { createEvent } from "./createPurchaseEvent.js";

const searchContainer = document.querySelector( '#searchContent' );

const parameters = new URLSearchParams( window.location.search );
const events = JSON.parse( parameters.get( 'value' ) );

if ( events?.length ) {
    for ( const event of events ) {
        const div = createEvent( event, 's' );
        searchContainer.append( div );
    }
} else {
    const p = document.createElement( 'p' );
    p.innerHTML = 'Oops! No events found.'
    searchContainer.append( p );
}
