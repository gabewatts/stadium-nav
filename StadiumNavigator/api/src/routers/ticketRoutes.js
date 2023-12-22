const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cookieParser());
router.use(express.json());
const TicketDAO = require('../../db/TicketDAO');
const EventDAO = require('../../db/EventDAO');
const { tokenMiddleware } = require('../middleware/tokenMiddleware');

// router.get('/tickets', tokenMiddleware, (req, res) => {
//     TicketDAO.getTickets().then(tickets => {
//         res.json(tickets);
//     });
// });

router.get('/tickets/:ticketId', tokenMiddleware, (req, res) => {
    const ticketId = req.params.ticketId;
    TicketDAO.getTicket(ticketId).then(ticket => {
        res.json(ticket);
    });
});

router.get('/tickets/events/:eventId', tokenMiddleware, (req, res) => {
    const eventId = req.params.eventId;
    TicketDAO.getTicketsByEvent(eventId).then(tickets => {
        res.json(tickets);
    });
});

router.get('/tickets/users/:ownerId', tokenMiddleware, (req, res) => {
    const ownerId = req.params.ownerId;
    TicketDAO.getTicketsByOwner(ownerId).then(tickets => {
        let events = [];
        let ret = [];
        tickets.forEach((ticket) => {
            if (ticket.event == eventId) {
                EventDAO.getEventById(ticket.event).then((event) => {
                    events.push(event);
                });
            }
            
        });

        sortEvents(events);
        events.forEach((event) => {
            for (const ticket of tickets)
            {
                if (ticket.event == event.id) {
                    ret.push(ticket)
                }
            }
        });
        res.json(ret);
    }).catch(() => {
        res.status(404).json(('user not found'));
    });
});

router.get('/tickets/users/current/all', tokenMiddleware, (req, res) => {
    const ownerId = req.params.ownerId;
    TicketDAO.getTicketsByOwner(ownerId).then(tickets => {
        let events = [];
        let ret = [];
        tickets.forEach((ticket) => {
            if (ticket.event == eventId) {
                EventDAO.getEventById(ticket.event).then((event) => {
                    events.push(event);
                });
            }
            
        });

        sortEvents(events);
        events.forEach((event) => {
            for (const ticket of tickets)
            {
                if (ticket.event == event.id) {
                    ret.push(ticket)
                }
            }
        });
        res.json(ret);
    }).catch(() => {
        res.status(404).json(('user not found'));
    });
});

router.get('/tickets/users/current/upcoming', tokenMiddleware, (req, res) => {
    TicketDAO.getTicketsByOwner( req.user.id ).then( tickets => {
        let yesterday = new Date();
        yesterday.setDate( yesterday.getDate() - 1 );
        let upcoming = tickets.filter( ticket => new Date( ticket.date ) > yesterday );
        upcoming.sort( (a, b) => new Date(a.date) - new Date(b.date) );
        res.json( upcoming );
    }).catch(() => {
        res.status(404).json(('tickets not found'));
    });
});

router.get('/tickets/users/current/history', tokenMiddleware, (req, res) => {
    const ownerId = req.params.ownerId;
    TicketDAO.getTicketsByOwner(ownerId).then(tickets => {
        let events = [];
        let ret = [];
        tickets.forEach((ticket) => {
            if (ticket.event == eventId) {
                EventDAO.getEventById(ticket.event).then((event) => {
                    if (past(event.date)) {
                        events.push(event);
                    }
                });
            }
            
        });

        sortEvents(events);
        events.forEach((event) => {
            for (const ticket of tickets)
            {
                if (ticket.event == event.id) {
                    ret.push(ticket)
                }
            }
        });
        res.json(ret);
    }).catch(() => {
        res.status(404).json(('user not found'));
    });
});

// router.get('/tickets/users/:ownerId/events/:eventId', tokenMiddleware, (req, res) => {
//     const ownerId = req.params.ownerId;
//     const eventId = req.params.eventId;
//     TicketDAO.getTicketsByOwner(ownerId).then(tickets => {
//         let ret = [];
//         tickets.forEach((ticket) => {
//             if (ticket.event == eventId) {
//                 ret.push(ticket);
//             }
//         });
        
//         res.json(ret);
//     }).catch(() => {
//         res.status(404).json(('user not found'));
//     });
// });

router.get('/tickets/users/current/events/:eventId', tokenMiddleware, (req, res) => {
    const ownerId = req.user.id;
    const eventId = req.params.eventId;
    TicketDAO.getTicketsByOwner(ownerId).then(tickets => {
        let ret = [];
        tickets.forEach((ticket) => {
            if (ticket.event == eventId) {
                ret.push(ticket);
            }
        });
        
        res.json(ret);
    }).catch(() => {
        res.status(404).json(('user not found'));
    });
});

router.get('/tickets/venues/:venueId', tokenMiddleware, (req, res) => {
    const venueId = req.params.venueId;
    TicketDAO.getTicketsByVenue(venueId).then(tickets => {
        res.json(tickets);
    }).catch(() => {
        res.status(404).json(('venue not found'));
    });
});

//create a ticket for an event to add to the user's wallet
router.post('/tickets', tokenMiddleware, (req, res) => {
    const userId = req.user.id;
    const eventId = req.body.eventId;
    TicketDAO.createTicket( userId, eventId ).then(ticket => {
        res.json(ticket);
    }).catch(() => {
        res.status(401).json({error: 'error creating ticket'});
    })
});

// delete ticket
router.delete( '/tickets/:ticketId', tokenMiddleware, ( req, res ) => {
    const userId = req.user.id;
    const ticketId = req.params.ticketId;
    TicketDAO.deleteTicket( userId, ticketId ).then( () => {
        res.json( {message: 'Success!'} );
    }).catch( () => {
        res.status( 403 ).json( {error: 'Oops! Error deleting ticket.'} );
    });
});

//send ticket
router.put('/tickets', tokenMiddleware, (req, res) => {
    const newOwnerUsername = req.body.username;
    const ticketId = parseInt(req.body.ticketId);
    TicketDAO.sendTicket(newOwnerUsername, ticketId).then(results => {
        res.json('ticket sent');
    }).catch( (error) => {
        const message = error.message;
        res.status(401).json(message + 'error sending ticket');
    });
});

module.exports = router;

//sorts events by date
function sortEvents(events) {
    return events.sort(timeComparator);
}

function timeComparator(a, b) {
    let d1 = new Date(a.date);
    let d2 = new Date(b.date);

    if (d1.getTime() < d2.getTime()) {
        return 1;
    }
    else if (d1.getTime() >= d2.getTime()) {
        return -1
    }
}

function upcoming(date) {
    let d1 = new Date(date);
    d1.setHours(d1.getHours() + 6);

    let d2 = new Date();

    return (d1 >= d2);
}

function past(date) {
    return !this.upcoming(date);
}