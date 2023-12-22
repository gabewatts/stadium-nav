import api from './APIclient.js';
import storageHandler from './storageHandler.js';

function addToWallet( e ) {
    api.createTicket( e.target.eventId ).then( ticket => {
        storageHandler.setActiveTicket( ticket.id );
        location.href = './ticket?eventId=' + ticket.event;
    }).catch( () => {
        location.href = './guest';
    });
}

// creates and returns a div containing event information
//
// return:
// <div>
//     <label for="event.id">
//         <span>event.name</span>
//         <span>event.date</span>
//     </label>
//     <input type="radio" name="eventSection_ch" id="event.id"></div>
//     <div>
//         <span>event.venueName</span>
//         <p>event.description</p>
//         <button type="button" class="button primaryColors mediaButton">Add To Wallet</button>
//     </div>
// </div>
export const createEvent = ( event, ch ) => {
    const div = document.createElement( 'div' );
    const label = document.createElement( 'label' );
    const id = `${event.id}${ch}_${event.date_converted}`;
    label.htmlFor = id;
    const name = document.createElement( 'span' );
    name.innerHTML = event.name;
    const date = document.createElement( 'span' );
    date.innerHTML = event.date_converted;
    label.append( name, date );
    const checkbox = document.createElement( 'input' );
    checkbox.type = 'radio';
    checkbox.name = 'eventSection_' + ch;
    checkbox.id = id;
    const details = document.createElement( 'div' );
    const location = document.createElement( 'span' );
    location.innerHTML = event.venueName;
    const description = document.createElement( 'p' );
    description.innerHTML = event.description;
    const purchase = document.createElement( 'button' );
    purchase.type = 'button';
    purchase.classList.add( 'button', 'primaryColors', 'mediaButton' );
    purchase.textContent = 'Add To Wallet';
    purchase.eventId = event.id;
    purchase.addEventListener( 'click', addToWallet );
    details.append( location, description, purchase );
    div.append( label, checkbox, details );
    return div;
};
