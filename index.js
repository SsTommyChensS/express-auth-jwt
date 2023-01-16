const { config } = require('dotenv');
const express = require('express');
const app = express();
const routes = require('./routes/index.routes');
const session = require('express-session');
const connectMongoServer = require('./config/db.config');

//Get enviroment variables from .env
config();
//Connect mongodb server
connectMongoServer();
//Allow json data request
app.use(express.json());
//Cookie session
app.use(session({
    resave: true,
    secret: process.env.COOKIE_SECRET,
    secure: true,
    saveUninitialized: true, 
     // Cookie Options
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    } // 24 hours
}))
// Assign all available routes to api routes
app.use('/api', routes)
// Listen port
const PORT = process.env.SERVER_PORT || 8000
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}.`);
});
