const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());
router.use(express.json());
const VenueDAO = require('../../db/VenueDAO');
const { tokenMiddleware } = require('../middleware/tokenMiddleware');

router.get('/venues', tokenMiddleware, (req, res) => {
    VenueDAO.getVenues().then(venues => {
        res.json(venues);
    });
});

//removing name routes
// router.get('/venues/:name', tokenMiddleware, (req, res) => {
//     const name = req.params.name;
//     VenueDAO.getVenueByName(name).then(venue => {
//         res.json(venue);
//     }).catch(() => {
//         res.status(404).json(('venue not found'));
//     });
// });

router.get('/venues/:venueId', tokenMiddleware, (req, res) => {
    const venueId = req.params.venueId;
    VenueDAO.getVenueById(venueId).then(venue => {
        res.json(venue);
    }).catch(() => {
        res.status(404).json(('venue not found'));
    });
});

router.get('/venues?state=:state', tokenMiddleware, (req, res) => {
    const state = req.params.state;
    VenueDAO.getVenuesByState(state).then(venues => {
        res.json(venues);
    }).catch(() => {
        res.status(404).json(('state not found'));
    });
});

router.post('/venues', tokenMiddleware, (req, res) => {
    VenueDAO.createVenue(req.body).then(venue => {
        res.json(venue);
    }).catch((err) => {
        res.json('error creating venue');
    });
});

module.exports = router;