const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());
router.use(express.json());
const EventDAO = require('../../db/EventDAO');
const VenueDAO = require('../../db/VenueDAO');
const { tokenMiddleware } = require('../middleware/tokenMiddleware');
const UserDAO = require('../../db/UserDAO');

router.get('/events/:eventId', tokenMiddleware, async (req, res) => {
    const eventId = req.params.eventId;
    const event = await EventDAO.getEventById(eventId).catch(() => {
        res.status(404).json(('event not found'));
    });

    event.venueName = await VenueDAO.getVenueById(event.venueId);
    res.json(event);
});

router.get('/events/:eventId/details', tokenMiddleware, (req, res) => {
    const eventId = req.params.eventId;
    EventDAO.getEventById(eventId).then(event => {
        res.json(event.details);
    }).catch(() => {
        res.status(404).json(('event not found'));
    });
});

//venue should be a name field
router.get('/events/venues/:venue', tokenMiddleware, async (req, res) => {
    const venue = req.params.venue;
    const events = await EventDAO.getEventsByVenue(venue).catch(() => {
        res.status(404).json(('venue not found'));
    });

    for (const event of events) {
        event.venueName = venue;
    }
    res.json(sortEvents(events));
});

router.get('/events/upcoming/all', async (req, res) => {
    EventDAO.getUpcomingEvents().then( events => {
        res.json( events );
    }).catch(() => {
        res.status(404).json(('error getting events'));
    });
});

router.post('/events', tokenMiddleware, (req, res) => {
    const event_data = req.body;
    EventDAO.createEvent(event_data).then(event => {
        res.json(event);
    }).catch((err) => {
        res.status(404).json(('error creating event'));
    });
    
});

router.get( '/events/search/:value', tokenMiddleware, ( req, res ) => {
    const value = req.params.value;
    UserDAO.search( value ).then( events => {
        res.json( events );
    }).catch( () => {
        res.status( 404 ).json( {error: 'Oops! No events found for: ' + value} );
    });
});

module.exports = router;

function sortEvents(events) {
    return events.sort(timeComparator);
}

function timeComparator(a, b) {
    let d1 = new Date(a.date);
    let d2 = new Date(b.date);

    return d1.getTime() - d2.getTime();
}