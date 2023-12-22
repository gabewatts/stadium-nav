import api from './APIclient.js';

// logged in already?
api.getUser().then( () => {
    location.href = './home';
}).catch( () => {
    // do nothing
});
