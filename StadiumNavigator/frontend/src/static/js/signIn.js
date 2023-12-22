import api from './APIclient.js';
import storageHandler from './storageHandler.js';

const formItems = document.querySelectorAll( '.formItem' );
const form = formItems[ 0 ];
const feedback = formItems[ 1 ];

// sign in
function authenticate( e ) {
    // prevent default form action
    e.preventDefault();

    const data = new FormData( e.target );
    const username = data.get( 'username' );
    const password = data.get( 'password' );

    if ( username && password ) {
        api.login( username, password ).then( user => {
            storageHandler.updateSettings( user );
            location.href = './home';
        }).catch( () => {
            feedback.classList.remove( 'none' );
        });
    }
    else
        console.log( 'oops!', data );
}

form.addEventListener( 'submit', authenticate );
