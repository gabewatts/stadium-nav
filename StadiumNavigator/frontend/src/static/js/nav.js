import api from './APIclient.js';

const nav = document.querySelectorAll( '.nav' );
const hamburger = nav[ 0 ];
const searchButton = nav[ 1 ];
const sidebar = nav[ 2 ];
const searchBar = nav[ 3 ];
const searchForm = nav[ 4 ];
const search = nav[ 5 ];
const background = nav[ 6 ];

function showSidebar() {
    sidebar.classList.add( 'translateToOrigin' );
    background.classList.add( 'dimBackground' );
    document.body.classList.add( 'noScroll' );
}

function hideNavs() {
    sidebar.classList.remove( 'translateToOrigin' );
    searchBar.classList.remove( 'translateToOrigin' );
    background.classList.remove( 'dimBackground' );
    document.body.classList.remove( 'noScroll' );
}

function showSearchbar() {
    searchBar.classList.add( 'translateToOrigin' );
    background.classList.add( 'dimBackground' );
    document.body.classList.add( 'noScroll' );
    search.focus();
}

hamburger.addEventListener( 'click', showSidebar );
searchButton.addEventListener( 'click', showSearchbar );
background.addEventListener( 'click', hideNavs );

// search
function searchEvents( e ) {
    e.preventDefault();
    const data = new FormData( e.target );
    const value = data.get( 'search' );
    console.log( value );
    api.searchEvents( value ).then( events => {
        location.href = './search?value=' + JSON.stringify( events );
    }).catch( () => {
        console.log( 'none found' );
    });
}

searchForm.addEventListener( 'submit', searchEvents );
