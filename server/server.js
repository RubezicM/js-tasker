const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const hbs = require('express-hbs');
const axios = require('axios');

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
    fs.readFile('./dummyDB/users.json', (err, data) => {
        if (err) {
            return res.send(err);
        };
        let users = JSON.parse(data);
        if (users.filter((element) => element.username === user.username).length > 0) {
            return res.status(400).send('Username already exists!');
        }
        users.push(user);
        fs.writeFile('./dummyDB/users.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.send(err);
            };

            res.send(user);
        });
    });
});

app.get('/users', (req, res) => {
    fs.readFile('./dummyDB/users.json', (err, data) => {
        if (err) {
            res.send(err);
        };
        res.send(JSON.parse(data));
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
    fs.readFile('./dummyDB/users.json', (err, data) => {
        if (err) {
            return res.send(err);
        };
        let users = JSON.parse(data);
        if (users.find((element) => element.username === user.username && element.password === user.password)) {
            res.cookie(user.username, user.password);
            return res.send(user.username);
        }
        res.status(404).send('Username or password incorrect.');
    });
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




