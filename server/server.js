const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const hbs = require('express-hbs');
const axios = require('axios');

const { Users, getUsers } = require('./utils/dummy_db');

let users;
getUsers().then((data) => {
    users = new Users(data);
}).catch((err) => console.log(err));

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

///////////////////////////////////////////////////////

app.post('/users', (req, res) => {
    let user = req.body;

    if (users.addUser(user)) {
        users.writeUsers().then((data) => {
            return res.send(user);
        }).catch((err) => res.status(400).res.send(err));
    } else {
        res.status(400).send('Username already exists!');
    }
});

app.get('/users', (req, res) => {
    res.send(users.users);
});

app.post('/login', (req, res) => {
    let user = req.body;

    if (users.userLogin(user)) {
        return res.send(`${user.username} logged in successfully.`);
    } else {
        res.status(401).send('Username or password incorrect!');
    };
});




/////////////////////////////////////////////////////////////

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




