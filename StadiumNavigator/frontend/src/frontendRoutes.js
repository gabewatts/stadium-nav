const express = require( 'express' );
const router = express.Router();

// base
router.get( '/', ( req, res ) => {
    res.redirect( '/guest' );
});

// guest
router.get( '/guest', ( req, res ) => {
    const data = { title: 'Welcome!' };
    res.render('guest', data );
});

// post authentication homepage 
router.get( '/home', ( req, res ) => {
    const data = { title: `Welcome!` };
    res.render( 'home', data );
});

router.get( '/seat', ( req, res ) => {
    const act ='MySeat';
    const data = { title: act };
    res.render( 'map', data );
});
router.get( '/bathroom', ( req, res ) => {
    const act ='Bathroom';
    const data = { title: act };
    res.render( 'map', data );
});
router.get( '/park', ( req, res ) => {
    const act ='Parking';
    const data = { title: act };
    res.render( 'map', data );
});
router.get( '/vendor', ( req, res ) => {
    const act ='Vendor';
    const data = { title: act };
    res.render( 'map', data );
});
router.get( '/service', ( req, res ) => {
    const act ='EmergencyService';
    const data = { title: act };
    res.render( 'map', data );
});

// sign in
router.get( '/sign-in', ( req, res ) => {
    const data = { title: 'Sign In' };
    res.render( 'signIn', data );
});

// sign up
router.get( '/sign-up', ( req, res ) => {
    const data = { title: 'Sign Up' };
    res.render( 'signUp', data );
});

/* account */
// wallet
router.get( '/wallet', ( req, res ) => {
    const data = { title: 'Wallet' };
    res.render( 'wallet', data );
});

router.get( '/ticket', ( req, res ) => {
    const data = { title: 'ticket'};
    res.render( 'ticket', data );
});

// profile
router.get( '/profile', ( req, res ) => {
    const data = { title: 'Profile' };
    res.render( 'profile', data );
});

// event history
router.get( '/history', ( req, res ) => {
    const data = { title: 'Event History' };
    res.render( 'history', data );
});

/* support */
// settings
router.get( '/settings', ( req, res ) => {
    const data = { title: 'Settings' };
    res.render( 'settings', data );
});

// about us
router.get( '/about', ( req, res ) => {
    const data = { title: 'About Us' };
    res.render( 'aboutUs', data );
});
// guest about us
router.get( '/guest-about', ( req, res ) => {
    const data = { title: 'About Us' };
    res.render( 'guestAboutUs', data );
});

// help
router.get( '/help', ( req, res ) => {
    const data = { title: 'Help' };
    res.render( 'help', data );
});
// guest help
router.get( '/guest-help', ( req, res ) => {
    const data = { title: 'Help' };
    res.render( 'guestHelp', data );
});

router.get( '/info', ( req, res ) => {
    const data = { title: 'General Information' };
    res.render( 'info', data );
});

router.get( '/offline', ( req, res ) => {
    const data = { title: 'Offline' };
    res.render( 'offline', data );
});

router.get( '/construction', ( req, res ) => {
    const data = { title: 'Construction' };
    res.render( 'construction', data );
});

router.get( '/search', ( req, res ) => {
    const data = { title: 'Search' };
    res.render( 'search', data );
});

// TEMPLATE
// router.get( '/TEMPLATE', ( req, res ) => {
//     const data = { title: 'TEMPLATE' };
//     res.render( 'TEMPLATE', data );
// });

module.exports = router;