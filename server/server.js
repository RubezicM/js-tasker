const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const hbs = require('express-hbs');
const axios = require('axios');

const dummy_db = require('./utils/dummy_db');

const app = express();

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(cookieParser());

/////////////////// Routes ///////////////////////

app.get('/', (req, res) => {
    res.render('home.hbs', {
        message: 'Radi!'
    });
});

app.get('/register', (req, res) => {
    res.render('register.hbs');
});

app.post('/users', (req, res) => {
    let user = req.body;

    dummy_db.getUsers().then((users) => {
        if (dummy_db.userExists(user, users)) {
            res.status(400).send('Username already exists!');
        };
        users.push(user);
        dummy_db.writeUsers(users);
        res.send(user);
    }).catch((err) => res.status(400).send(err)) ;
});

app.get('/users', (req, res) => {
    dummy_db.getUsers().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/main', (req, res) => {
    res.render('main.hbs', {
        user: 'User'
    });
});

app.get('/login', (req, res) => {
    res.render('login.hbs', {
        user: 'User'
    });
});

app.post('/login', (req, res) => {
    let user = req.body;

    dummy_db.getUsers().then((users) => {
        if (dummy_db.userLogin(user, users)) {
            res.send(user);
        };
        res.status(404).send('user not found');
    }).catch((err) => res.status(404).send(err));
});



app.listen(3000, () => {
    console.log(`Started listenning on port 3000`);
});

module.exports = { app };





/////////////////// Other

// app.get('/login', function (req, res, next) {
//     let pass = '123';
//     res.cookie('pass', pass);
//     res.send('ok');
// });

// app.use((req, res, next) => {
//     console.log('radi');
//     next();
// });




