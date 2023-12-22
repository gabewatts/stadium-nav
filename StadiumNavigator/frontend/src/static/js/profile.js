import api from './APIclient.js';
import { user } from './getCurrentUser.js';

const profileContainer = document.querySelectorAll( '.profile' );
const form = profileContainer[ 0 ];
const preview = profileContainer[ 1 ];
const avatarInput = profileContainer[ 2 ];
const randomizer = profileContainer[ 3 ];
const firstFS = profileContainer[ 4 ];
const first = profileContainer[ 5 ];
const lastFS = profileContainer[ 6 ];
const last = profileContainer[ 7 ];
const usernameFS = profileContainer[ 8 ];
const username = profileContainer[ 9 ];
const passwordFS = profileContainer[ 10 ];
const password = profileContainer[ 11 ];
const updatePasswordFS = profileContainer[ 12 ];
const updatePassword = profileContainer[ 13 ];
const confirmPasswordFS = profileContainer[ 14 ]
const confirmPassword = profileContainer[ 15 ];
const feedback = profileContainer[ 16 ];
const save = profileContainer[ 17];
const edit = profileContainer[ 18 ];
const changePassword = profileContainer[ 19 ];

first.value = user.first_name;
last.value = user.last_name;
username.value = user.username;
const img = document.createElement( 'img' );
img.src = user.avatar;
img.alt = 'Profile Picture';
preview.append( img );
avatarInput.value = user.avatar;

function editProfile() {
    form.dataset.type = 'profile';
    changePassword.classList.add( 'none' );
    firstFS.disabled = false;
    lastFS.disabled = false;
    usernameFS.disabled = false;
    first.required = true;
    last.required = true;
    username.required = true;
    randomizer.classList.remove( 'none' );
    first.focus();
    edit.addEventListener( 'click', cancel, {once: true} );
    edit.textContent = 'Cancel';
    edit.classList.remove( 'primaryColors' );
    edit.classList.add( 'secondaryColors' );
    save.classList.remove( 'none' );
}

edit.addEventListener( 'click', editProfile, {once: true} );

function editPassword() {
    form.dataset.type = 'password';
    firstFS.classList.add( 'none' );
    lastFS.classList.add( 'none' );
    usernameFS.classList.add( 'none' );
    passwordFS.classList.remove( 'none' );
    updatePasswordFS.classList.remove( 'none' );
    confirmPasswordFS.classList.remove( 'none' );
    edit.classList.add( 'none' );
    passwordFS.disabled = false;
    updatePasswordFS.disabled = false;
    confirmPasswordFS.disabled = false;
    password.required = true;
    updatePassword.required = true;
    confirmPassword.required = true;
    password.focus();
    changePassword.textContent = 'Cancel';
    changePassword.classList.remove( 'primaryColors' );
    changePassword.classList.add( 'secondaryColors' );
    changePassword.addEventListener( 'click', cancel, {once: true} );
    save.classList.remove( 'none' );
}

changePassword.addEventListener( 'click', editPassword, {once: true} );

function cancel() {
    if ( form.dataset.type === 'profile' ) {
        first.value = user.first_name;
        last.value = user.last_name;
        username.value = user.username;
        avatarInput.value = user.avatar;
        const img = document.createElement( 'img' );
        img.src = user.avatar;
        img.alt = 'Profile Picture';
        preview.removeChild( preview.firstChild );
        preview.append( img );
    
        firstFS.disabled = true;
        lastFS.disabled = true;
        usernameFS.disabled = true;
        first.required = false;
        last.required = false;
        username.required = false;
        randomizer.classList.add( 'none' );
    
        edit.addEventListener( 'click', editProfile, {once: true} );
        edit.textContent = 'Edit Profile';
        edit.classList.remove( 'secondaryColors' );
        edit.classList.add( 'primaryColors' );
        save.classList.add( 'none' );
        feedback.classList.add( 'none' );
        changePassword.classList.remove( 'none' );
    }

    else if ( form.dataset.type === 'password' ) {
        passwordFS.disabled = true;
        confirmPasswordFS.disabled = true;
        password.required = false;
        updatePassword.required = false;
        confirmPassword.required = false;

        changePassword.addEventListener( 'click', editPassword, {once: true} );
        changePassword.textContent = 'Change Password';
        save.classList.add( 'none' );
        feedback.classList.add( 'none' );
        edit.classList.remove( 'none' );
        passwordFS.classList.add( 'none' );
        updatePasswordFS.classList.add( 'none' );
        confirmPasswordFS.classList.add( 'none' );
        firstFS.classList.remove( 'none' );
        lastFS.classList.remove( 'none' );
        usernameFS.classList.remove( 'none' );
    }
}

function randomizeAvatar() {
    // generate a random avatar
    let randomString = '';
    const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let length = Math.floor( Math.random() * 15 ) + 10;
    while ( length-- > 0 )
        randomString += validChars.charAt( Math.floor( Math.random() * validChars.length ) );
    const avatar = `https://robohash.org/${randomString}.png?size=64x64&set=set1&bgset=any`;
    avatarInput.value = avatar;

    const img = document.createElement( 'img' );
    img.src = avatar;
    img.alt = 'Profile Picture';
    preview.removeChild( preview.firstChild );
    preview.append( img );
}

randomizer.addEventListener( 'click', randomizeAvatar );

function saveProfile( e ) {
    // prevent default form action
    e.preventDefault();
    
    // reset feedback
    feedback.classList.add( 'none' );

    // get form data
    const data = new FormData( e.target );

    if ( form.dataset.type === 'profile' ) {
        const userFirst = data.get( 'firstName' );
        const userLast = data.get( 'lastName' );
        const userUsername = data.get( 'username' );
        const userAvatar = data.get( 'avatar' );
    
        api.updateProfile( userFirst, userLast, userUsername, userAvatar ).then( () => {
            location.reload();
        }).catch( err => {
            if ( err.status == 403 )
                feedback.textContent = `Oops! Username ${userUsername} is unavailable.`;
            else
                feedback.textContent = 'Oops! Something went wrong.';
            feedback.classList.remove( 'none' );
        });
    }

    else if ( form.dataset.type === 'password' ) {
        const userPassword = data.get( 'password' );
        const userUpdated = data.get( 'update' );
        const userConfirm = data.get( 'confirm' );

        if ( userUpdated !== userConfirm ) {
            feedback.textContent = 'Oops! Passwords do not match.';
            feedback.classList.remove( 'none' );
        }

        else {
            api.updatePassword( userPassword, userUpdated ).then( () => {
                location.reload();
            }).catch( err => {
                feedback.textContent = 'Oops! Invalid password.';
                feedback.classList.remove( 'none' );
            })
        }
    } 
}

form.addEventListener( 'submit', saveProfile );
