const express = require('express');

const app = express();
const PORT = process.env.PORT;

const apiRoutes = require('./apiRoutes');
app.use(apiRoutes);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));