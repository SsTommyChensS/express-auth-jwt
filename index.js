const { config } = require('dotenv');
const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
const connectMongoServer = require('./config/db.config');

//Get enviroment variables from .env
config();
//Connect mongodb server
connectMongoServer();
//Allow json data request
app.use(express.json());
// Assign all available routes to api routes
app.use('/api', routes)
// Listen port
const PORT = process.env.SERVER_PORT || 8000
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});
