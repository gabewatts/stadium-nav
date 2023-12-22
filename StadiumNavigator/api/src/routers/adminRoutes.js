const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());
router.use(express.json());
const { tokenMiddleware } = require('../middleware/tokenMiddleware');

router.put('/events', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/events/:name', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/users', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/venues', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/venues/:name', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/tickets/:eventId', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/tickets/user/:ownerId', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.put('/tickets/venue/:venueId', tokenMiddleware, (req, res) => {
    res.json('endpoint reached');
});

router.get('/users/id/:userId/events', tokenMiddleware, (req, res) => {
    const userId = req.params.userId;
    UserDAO.getUserEvents(userId).then(events => {
        res.json(events);
    }).catch((err) => {
        res.status(404).json(('user not found'));
    });
});

router.get('/users/id/:userId/events/upcoming', tokenMiddleware, (req, res) => {
    const userId = req.params.userId;
    UserDAO.getUserUpcomingEvents(userId).then(events => {
        res.json(events);
    }).catch((err) => {
        res.status(404).json(('user not found'));
    });
});

router.get('/users/id/:userId/events/history', tokenMiddleware, (req, res) => {
    const userId = req.params.userId;
    UserDAO.getUserUpcomingEvents(userId).then(events => {
        res.json(events);
    }).catch((err) => {
        res.status(404).json(('user not found'));
    });
});

router.get('/users/id:userId/events/active', tokenMiddleware, (req, res) => {
    const userId = req.params.userId;
    UserDAO.getActiveEvent().then(event => {
        res.json(event);
    }).catch((err) => {
        res.status(404).json(('user not found'));
    });
});

module.exports = router;