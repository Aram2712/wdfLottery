require('dotenv').config();
const express = require('express');
const app = express();
const eL = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Router = require('./routers/router.js');
const passport = require('passport')
const PORT = 8000;

app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.USER_SECRET,
    saveUninitialized: false,
    resave: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/', Router);


app.use(eL)

app.listen(PORT, () => {
    console.log('Server has started...')
})


