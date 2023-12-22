//import api from './APIclient.js';

import storageHandler from './storageHandler.js';
const activeTicket = storageHandler.getActiveTicket();

// ADD THE BASE IMAGE \\
const actionContainer = document.querySelector( '#mapID' );
const name = document.querySelector( '#titleID' );
name.innerHTML = activeTicket.venueName;

const imgStadium = document.createElement( 'img' );
imgStadium.src = `./images/${ activeTicket.venueMap }`;
imgStadium.alt = `${ activeTicket.venueMap }`;
actionContainer.append( imgStadium );


// ADD THE STAR IMAGE \\
// ADD THE SEAT INFO \\
const imgStar = document.createElement( 'img' );
imgStar.src = `./images/${ activeTicket.seatMap }`;
imgStar.classList.add("stars");
actionContainer.append( imgStar );

const messageContainer = document.querySelector( '#messageID' );
const msg = document.createElement( 'h3' );
msg.innerHTML = `${activeTicket.seatInfo}`;
messageContainer.append(msg);









