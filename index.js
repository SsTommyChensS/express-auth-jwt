const { config } = require('dotenv');
const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
const cookieSession = require('cookie-session');
const connectMongoServer = require('./config/db.config');

//Get enviroment variables from .env
config();
//Connect mongodb server
connectMongoServer();
//Allow json data request
app.use(express.json());
//Cookie session
app.use(cookieSession({
    name: 'Tommy-session',
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
    secure: true,
}))
// Assign all available routes to api routes
app.use('/api', routes)
// Listen port
const PORT = process.env.SERVER_PORT || 8000
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});
