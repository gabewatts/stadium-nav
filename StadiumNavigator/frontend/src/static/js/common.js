import api from './APIclient.js';
import { user } from './getCurrentUser.js';
import storageHandler from './storageHandler.js';

const downloadable = document.querySelectorAll( '.downloadable' );
const sidebarItems = document.querySelectorAll( '.sidebarItem' );
const signOutButton = sidebarItems[ 0 ];
const activeTicketContainer = sidebarItems[ 1 ];
const activeTickets = sidebarItems[ 2 ];

const STATIC_CACHE_NAME = 'my-stadium-navigator-static-v0';

let assets = [
    '/offline',
    '/wallet',
    // css
    '/css/app.css',
    '/css/about.css',
    '/css/events.css',
    '/css/form.css',
    '/css/help.css',
    '/css/login.css',
    '/css/map.css',
    '/css/profile.css',
    '/css/settings.css',
    '/css/wallet.css',
    '/css/ticket.css',
    '/css/details.css',
    // js
    '/js/APIclient.js',
    '/js/Bathroom.js',
    '/js/common.js',
    '/js/createEvent.js',
    '/js/EmergencyService.js',
    '/js/eventHistory.js',
    '/js/getCurrentUser.js',
    '/js/guest.js',
    '/js/home.js',
    '/js/ticket.js',
    '/js/serviceWorker.js',
    '/js/createPurchaseEvent.js',
    '/js/info.js',
    '/js/upcomingEvents.js',
    '/js/guestUpcomingEvents.js',
    '/js/myEvents.js',
    '/js/MySeat.js',
    '/js/Vendor.js',
    '/js/Parking.js',
    '/js/wallet.js',
    '/js/HTTPclient.js',
    '/js/nav.js',
    '/js/settings.js',
    '/js/storageHandler.js',
    '/js/signIn.js',
    '/js/signUp.js',
    '/js/profile.js',
    // images
    '/images/Arrowhead_Stadium_Lot.jpeg',
    '/images/Arrowhead_Stadium.png',
    '/images/barcode.png',
    '/images/BOA_Stadium_Lot.png',
    '/images/BOA_Stadium.png',
    '/images/ER.pdf',
    '/images/evt_1_bathroom.png',
    '/images/evt_1_services.png',
    '/images/evt_1_vendor.png',
    '/images/evt_2_vendor.png',
    '/images/evt_3_bathroom.png',
    '/images/evt_3_services.png',
    '/images/evt_3_vendor.png',
    '/images/evt_4_bathroom.png',
    '/images/evt_4_services.png',
    '/images/evt_4_vendor.png',
    '/images/icons8-alarm-50.png',
    '/images/icons8-bathroom-50.png',
    '/images/icons8-check-30.png',
    '/images/icons8-download-50.png',
    '/images/icons8-folder-50.png',
    '/images/icons8-hamburger-50.png',
    '/images/icons8-health-32.png',
    '/images/icons8-help-50.png',
    '/images/icons8-home-50.png',
    '/images/icons8-info-50.png',
    '/images/icons8-link-24.png',
    '/images/icons8-loading.gif',
    '/images/icons8-location-50.png',
    '/images/icons8-parking-50.png',
    '/images/icons8-schedule-50.png',
    '/images/icons8-search-50.png',
    '/images/icons8-seat-50.png',
    '/images/icons8-settings-50.png',
    '/images/icons8-user-24.png',
    '/images/icons8-vendor-24.png',
    '/images/icons8-wallet-50.png',
    '/images/LO_Stadium_Lot.png',
    '/images/LO_Stadium.png',
    '/images/PNC_Arena_Lot.jpeg',
    '/images/PNC_Arena.jpg',
    '/images/qrcode_github.ncsu.edu.png',
    '/images/stadium.png',
    '/images/star_0.png',
    '/images/tkt_1_lot.png',
    '/images/tkt_1_seat.png',
    '/images/tkt_2_seat.png',
    '/images/tkt_3_lot.png',
    '/images/tkt_3_seat.png',
    '/images/tkt_4_seat.png',
    '/images/tkt_5_seat.png',
    '/images/tkt_6_seat.png',
    '/images/tkt_7_seat.png',
    '/images/tkt_8_lot.png',
    '/images/tkt_8_seat.png',
    // icons
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
    '/icons/apple-touch-icon.png',
    '/icons/favicon-16x16.png',
    '/icons/favicon-32x32.png',
    '/icons/favicon.ico',
    '/icons/mstile-70x70.png',
    '/icons/mstile-150x150.png',
    '/icons/mstile-310x310.png',
    '/icons/safari-pinned-tab.svg',
];

/* user settings */
storageHandler.start();

if ( user ) {
    api.getCurrentUserUpcomingTickets().then( tickets => {
        storageHandler.setTickets( tickets );
        const activeTicket = storageHandler.getActiveTicket();
        if ( activeTicket ) {
            const ticketLink = document.createElement( 'a' );
            ticketLink.href = './ticket?eventId=' + activeTicket.event;
            ticketLink.innerHTML = '<img src="./images/icons8-link-24.png" alt="View Ticket">';
            activeTicketContainer.append( ticketLink );
        }

        let paths = [];

        for ( const ticket of tickets ) {
            const asset = '/ticket?eventId=' + ticket.event;
            assets.push( asset );
            paths.push( asset );
            const option = document.createElement( 'option' );
            option.innerHTML = `${ticket.id} - ${ticket.name}`;
            option.value = ticket.id;
            if ( ticket.id == activeTicket?.id )
                option.selected = true;
            activeTickets.append( option );
        }

        caches.open( STATIC_CACHE_NAME ).then( cache => {
            return cache.addAll( paths );
        });
    }).catch( () => {
        activeTickets.disabled = true;
        const option = document.createElement( 'option' );
        option.innerText = 'None';
        activeTickets.append( option );
    });

    async function downloadData( e ) {
        e.target.src = './images/icons8-loading.gif';

        const asset = e.target.parentNode.dataset.asset;

        await caches.open( STATIC_CACHE_NAME ).then( cache => {
            assets.push( asset );
            return cache.addAll( [asset] );
        });

        storageHandler.updateDownloads( e.target.index );

        // update image
        e.target.src = './images/icons8-check-30.png';
    }

    const downloads = storageHandler.getDownloads();
    for ( let i = 0; i < downloads.length; ++i ) {
        if ( Number( downloads[ i ] ) ) {
            const c = document.createElement( 'img' );
            c.src = './images/icons8-check-30.png';
            c.alt = 'downloaded';
            downloadable[ i ].append( c );
        }
        else {
            const d = document.createElement( 'img' );
            d.src = './images/icons8-download-50.png';
            d.alt = 'download';
            d.index = i;
            d.addEventListener( 'click', downloadData );
            downloadable[ i ].append( d );
        }
    }

    function setActiveTicket( e ) {
        const ticketId = e.target.options[ e.target.selectedIndex ].value;
        api.setActiveTicket( ticketId ).then( ticket => {
            storageHandler.setActiveTicket( ticket.id );
            location.reload();
        }).catch( () => {
            activeTickets.value = user.active_ticket;
            console.log( 'Oops! Error setting active ticket.' );
        });
    }

    activeTickets.addEventListener( 'change', setActiveTicket );

    function signOut() {
        api.logout().then( () => {
            storageHandler.end();
            //remove all cache when logging out
            caches.keys().then( cacheNames => {
                return Promise.all( cacheNames.filter( name => {
                    return name.startsWith( 'my-stadium-navigator-' );
                }).map( name => {
                    return caches.delete( name );
                }) );
            });
            //add default caches back in
            caches.open( STATIC_CACHE_NAME ).then( cache => {
                return cache.addAll( assets );
            });

            location.href = './guest';
        }).catch( err => {
            console.log( err );
        });
    }

    signOutButton.addEventListener( 'click', signOut );
}
