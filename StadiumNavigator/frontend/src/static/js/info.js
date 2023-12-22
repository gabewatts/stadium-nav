//import api from './APIclient.js';



import storageHandler from './storageHandler.js';
const activeTicket = storageHandler.getActiveTicket();

//<div id="info">
//  <p>{ven_name} is at {address_street} in {address_city}, {address_state} {address_zip}.</p>
//</div>
const infoDiv = document.querySelector( '#info' );

const p = document.createElement( 'p' );
p.innerHTML = activeTicket.venueLocation;

infoDiv.append( p );

// get event history
// api.getCurrentUserPastEvents().then( events => { 
//     events.forEach( event => {
//         const div = createEvent( event, 'h' );
//         container.append( div );
//     });
// }).catch( () => {
//     console.log( 'oops! error in eventHistory.js' );
// });
