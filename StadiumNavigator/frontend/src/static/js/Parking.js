//import api from './APIclient.js';

import storageHandler from './storageHandler.js';
const activeTicket = storageHandler.getActiveTicket();

// ADD THE BASE IMAGE \\
const actionContainer = document.querySelector( '#mapID' );
const name = document.querySelector( '#titleID' );
name.innerHTML = activeTicket.venueName;

const imgStadium = document.createElement( 'img' );
imgStadium.src = `./images/${ activeTicket.venueMapLot }`;
imgStadium.alt = `${ activeTicket.venueMapLot }`;
actionContainer.append( imgStadium );


// ADD THE STAR IMAGE \\
const imgStar = document.createElement( 'img' );
imgStar.src = `./images/${ activeTicket.parkingMap }`; // line specific to this page
imgStar.classList.add("stars");
actionContainer.append( imgStar );