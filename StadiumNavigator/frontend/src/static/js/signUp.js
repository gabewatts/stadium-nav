import api from './APIclient.js';
import storageHandler from './storageHandler.js';

const formItems = document.querySelectorAll( '.formItem' );
const form = formItems[ 0 ];
const feedback = formItems[ 1 ];

// sign up
function create( e ) {
    // prevent default form action
    e.preventDefault();

    const data = new FormData( e.target );
    const first = data.get( 'firstName' );
    const last = data.get( 'lastName' );
    const username = data.get( 'username' );
    const password = data.get( 'password' );
    const confirm = data.get( 'confirmPassword' );

    if ( password != confirm ) {
        feedback.innerHTML = 'Oops! Password do not match.';
        feedback.classList.remove( 'none' );
    }
    else if ( first && last && username && password ) {
        api.register( first, last, username, password ).then( user => {
            storageHandler.updateSettings( user );
            location.href = './home';
        }).catch( () => {
            feedback.innerHTML = `Oops! Username ${username} is taken.`;
            feedback.classList.remove( 'none' );
        });
    }
    else {
        feedback.innerHTML = 'Oops! All fields are required.';
        feedback.classList.remove( 'none' );
    }
}

form.addEventListener( 'submit', create );