import api from './APIclient.js';
import storageHandler from './storageHandler.js';
import { user } from './getCurrentUser.js';

if ( user ) {
    const settings = document.querySelectorAll( '.setting' );
    const dark = settings[ 0 ];
    const notify = settings[ 1 ];
    const large = settings[ 2 ];

    dark.checked = user.stg_dark;
    notify.checked = user.stg_notify;
    large.checked = user.stg_text;

    function updateSetting() {
        api.updateSettings( dark.checked, notify.checked, large.checked ).then( user => {
            storageHandler.updateSettings( user );
            location.reload();
        }).catch( () => {
            location.href = './guest';
        });
    }

    settings.forEach( s => s.addEventListener( 'change', updateSetting ) );
}
