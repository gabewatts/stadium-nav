import api from './APIclient.js';

const container = document.querySelector( '#myEvents' );

// creates and returns a div containing event information
//
// return:
// <div>
//     <label for="event.id">
//         <span>event.name</span>
//         <span>event.date</span>
//     </label>
//     <input type="radio" name="eventSection" id="event.id"></div>
//     <div>
//         <span>event.venueName</span>
//         <p>event.description</p>
//     </div>
//     <a href="./ticket?eventId=${event.id}">
//         <img src="./images/icons8-link-24.png" alt="View Event Tickets">
//     </a>
// </div>
export const createEvent = ( event ) => {
    const div = document.createElement( 'div' );
    const label = document.createElement( 'label' );
    const id = `${event.id}_${event.date_converted}`;
    label.htmlFor = id;
    const name = document.createElement( 'span' );
    name.innerHTML = event.name;
    const date = document.createElement( 'span' );
    date.innerHTML = event.date_converted;
    label.append( name, date );
    const checkbox = document.createElement( 'input' );
    checkbox.type = 'radio';
    checkbox.name = 'eventSection';
    checkbox.id = id;
    const details = document.createElement( 'div' );
    const location = document.createElement( 'span' );
    location.innerHTML = event.venueName;
    const description = document.createElement( 'p' );
    description.innerHTML = event.description;
    const link = document.createElement( 'a' );
    link.href = './ticket?eventId=' + event.id;
    const img = document.createElement( 'img' );
    img.src = './images/icons8-link-24.png';
    img.alt = 'View Event Tickets';
    link.append( img );
    details.append( location, description, link );
    div.append( label, checkbox, details );
    return div;
};


// get my events
api.getCurrentUserUpcomingEvents().then( events => {
    if ( events.length ) {
        for ( const event of events ) {
            const div = createEvent( event, 'm' );
            container.append( div );
        }
    } else {
        const p = document.createElement( 'p' );
        p.innerText = "Add tickets to your wallet to see events here!";
        container.append( p );
    }
}).catch( () => {
    location.href = './guest';
});
