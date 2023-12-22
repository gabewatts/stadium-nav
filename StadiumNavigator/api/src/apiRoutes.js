const userRoutes = require( './routers/userRoutes.js' );
const adminRoutes = require( './routers/adminRoutes.js' );
const eventRoutes = require( './routers/eventRoutes.js' );
const venueRoutes = require( './routers/venueRoutes.js' );
const ticketRoutes = require( './routers/ticketRoutes.js' );

const express = require('express');
const apiRouter = express.Router();

apiRouter.use( userRoutes );
apiRouter.use( adminRoutes );
apiRouter.use( eventRoutes );
apiRouter.use( venueRoutes );
apiRouter.use( ticketRoutes );

module.exports = apiRouter;