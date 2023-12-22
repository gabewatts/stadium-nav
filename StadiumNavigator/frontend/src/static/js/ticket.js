import api from './APIclient.js';

const ticketContainer = document.querySelector( '#ticketContainer' );

function deleteTicket( e ) {
    console.log( e.target.ticketId );
    
    api.deleteTicket( e.target.ticketId ).then( () => {
        location.reload();
    }).catch( () => {
        location.href = './guest';
    });
}

function sendTicket ( ticketId, username ) {
    api.sendTicket(ticketId, username).then( () => {
        location.reload();
    }).catch( () => {
        location.href = './guest';
    });
}

// <section>
//     <h1>${ticket.name}</h1>
//     <div>
//         <span>Ticket ID #: ${ticket.id}-${ticket.owner}-${ticket.event}</span>
//         <span>${ticket.date_converted}</span>
//     </div>
//     <img src="./images/${ticket.qrCode}" alt="QR Code">
//     <img src="./images/${ticket.barCode}" alt="Bar Code"></img>
// </section>
function createTicket( ticket ) {
    const section = document.createElement( 'section' );
    section.classList.add( 'container' );
    const header = document.createElement( 'h1' );
    header.textContent = ticket.name;
    const div = document.createElement( 'div' );
    const id = document.createElement( 'span' );
    id.textContent = `Ticket ID #: ${ticket.id}-${ticket.owner}-${ticket.event}`;
    const date = document.createElement( 'span' );
    date.textContent = ticket.date_converted;
    div.append( id, date );
    const qr = document.createElement( 'img' );
    qr.src = './images/' + ticket.qrCode;
    qr.alt = 'QR Code';
    const bar = document.createElement( 'img' );
    bar.src = './images/' + ticket.barCode;
    bar.alt = 'Bar Code';
    const button = document.createElement( 'button' );
    button.type = 'button';
    button.classList.add( 'button', 'primaryColors', 'mediaButton' );
    button.textContent = 'Delete Ticket';
    button.ticketId = ticket.id;
    button.addEventListener( 'click', deleteTicket );
    
    const usernameInput = document.createElement( 'input' );
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Input Username to Send Ticket To'
    usernameInput.style.display = 'none';
    usernameInput.style.width = '45%';
    usernameInput.style.alignSelf = 'center';

    const confirmButton = document.createElement( 'button' );
    confirmButton.type = 'button';
    confirmButton.style.display = 'none';
    confirmButton.classList.add( 'button', 'primaryColors', 'mediaButton' );
    confirmButton.textContent = 'Confirm Send';
    confirmButton.ticketId = ticket.id;
    confirmButton.addEventListener( 'click', e => {
        sendTicket(e.target.ticketId, usernameInput.value);
    });

    const sendButton = document.createElement( 'button' );
    sendButton.type = 'button';
    sendButton.classList.add( 'button', 'primaryColors', 'mediaButton' );
    sendButton.textContent = 'Send Ticket';
    sendButton.ticketId = ticket.id;
    sendButton.addEventListener( 'click', e => {
        usernameInput.style.display = 'block';
        confirmButton.style.display = 'block';
    });

    

    section.append( header, div, qr, bar, button, sendButton, usernameInput, confirmButton );
    return section;
}

// <section>
//     <h1>No tickets found for this event!</h1>
//     <a class="button primaryColors mediaButton" href="./home">Find More Events!</a>
// </section>
function noTickets() {
    const section = document.createElement( 'section' );
    section.classList.add( 'container' );
    const header = document.createElement( 'h1' );
    header.textContent = 'No tickets found for this event!';
    const link = document.createElement( 'a' );
    link.href = './home';
    link.classList.add( 'button', 'primaryColors', 'mediaButton' );
    link.textContent = 'Find More Events!';
    section.append( header, link );
    ticketContainer.append( section );
}

api.getCurrentUserUpcomingTickets().then( tickets => {
    const parameters = new URLSearchParams( window.location.search );
    const eventId = parameters.get( 'eventId' );
    const eventTickets = tickets.filter( t => t.event == eventId );

    if ( eventTickets.length === 0 )
        noTickets();
    else {
        for ( const ticket of eventTickets ) {
            const section = createTicket( ticket );
            ticketContainer.append( section );
        }
    }
}).catch( () => {
    noTickets();
});
