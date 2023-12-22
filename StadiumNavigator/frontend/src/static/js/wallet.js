import api from './APIclient.js';

const wallet = document.querySelector( '#wallet' );

// creates and returns a section containing event information
//
// return:
// <section>
//     <input type="radio" name="walletSection" id="${event.id}">
//     <label for="${event.id}">
//         <h3>${event.name}</h3>
//         <span>${event.date_converted}</span>
//     </label>
//     <div>
//         <span>${event.venueName}</span>  
//         <div>
//             <p>${event.description}</p>
//             <a href="./ticket?eventId=${event.id}">
//                 <img src="./images/icons8-link-24.png alt="View Ticket">
//             </a>
//         </div>
//     </div>
// </section>
function createContainer( event ) {
    const section = document.createElement( 'section' );
    const checkbox = document.createElement( 'input' );
    checkbox.type = 'radio';
    checkbox.name = 'walletSection';
    const id = `${event.id}_${event.date_converted}`;
    checkbox.id = id;
    const label = document.createElement( 'label' );
    label.htmlFor = id;
    const name = document.createElement( 'h3' );
    name.innerHTML = event.name;
    const date = document.createElement( 'span' );
    date.innerHTML = event.date_converted;
    label.append( name, date );
    const details = document.createElement( 'div' );
    const location = document.createElement( 'span' );
    location.innerHTML = event.venueName;
    const div = document.createElement( 'div' );
    const description = document.createElement( 'p' );
    description.innerHTML = event.description;
    const link = document.createElement( 'a' );
    link.href = './ticket?eventId='+ event.id;
    const img = document.createElement( 'img' );
    img.src = './images/icons8-link-24.png';
    img.alt = 'View Ticket';
    link.append( img );
    div.append( description, link );
    details.append( location, div );
    section.append( checkbox, label, details );
    return section;
}

// get my events
api.getCurrentUserUpcomingEvents().then( events => {
    if ( events.length ) {
        for ( const event of events ) {
            const div = createContainer( event );
            wallet.append( div );
        }
    } else {
        const section = document.createElement( 'section' );
        section.classList.add( 'container' );
        const h1 = document.createElement( 'h1' );
        h1.textContent = 'Wallet';
        const p = document.createElement( 'p' );
        p.textContent = 'Your wallet is empty. Find events and add a ticket!';
        section.append( h1, p );
        wallet.append( section );
    }
}).catch( () => {
    location.href = './guest';
});
