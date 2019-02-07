const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-hbs');

const { Users, getUsers } = require('./utils/dummy_db');
const { authenticate } = require('./middleware/authenticate');
const { loggedIn } = require('./middleware/loggedIn');
const { inlineSyntax } = require('./parser/inline/inline-syntax');
const { commentsSyntax } = require('./parser/comments/comments-syntax');

let users;
getUsers().then((data) => {
    users = new Users(data);
}).catch((err) => console.log(err));

const port = process.env.PORT || 3000;

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

app.get('/register', loggedIn, (req, res) => {
    if (req.loggedIn) {
        res.render('logged.hbs', {
            user: req.user.username,
            message: 'registered'
        });
    } else {
        res.render('register.hbs');
    };
});

app.get('/main', authenticate, (req, res) => {
    res.render('main.hbs', {
        user: req.user.username
    });
});

app.get('/profile', authenticate, (req, res) => {
    res.render('profile.hbs', {
        user: req.user.username,
        password: req.user.password
    });
});

app.get('/login', loggedIn, (req, res) => {
    if (req.loggedIn) {
        res.render('logged.hbs', {
            user: req.user.username,
            message: 'logged in'
        });
    } else {
        res.render('login.hbs');
    };
});

app.get('/logout', authenticate, (req, res) => {
    res.render('logout.hbs', {
        user: req.user.username
    });
});

///////////////////////////////////////////////////////

app.post('/users', (req, res) => {
    let user = req.body;
    user.token = users.createToken();

    if (users.addUser(user)) {
        users.writeUsers().then((data) => {
            res.cookie('x-auth-token', user.token);
            return res.send(user);
        }).catch((err) => res.status(400).res.send(err));
    } else {
        res.status(400).send('Username already exists!');
    }
});

app.get('/users', (req, res) => {
    res.send(users.users);
});

app.delete('/users', (req, res) => {
    let user = req.body;

    if (users.removeUser(user.username)) {
        users.writeUsers().then((data) => {
            return res.send(user);
        }).catch((err) => res.status(400).send(err));
    } else {
        res.status(404).send('User not found');
    };
});

app.get('/users/:id', authenticate, (req, res) => {
    let username = req.params.id;
    if (username !== req.user.username) {
        return res.status(401).send('Not authorised to see this user');
    };

    let user = users.getUser(username);

    if (user) {
        return res.send(user);
    } else {
        return res.status(404).send('User not found!');
    };
});

app.post('/login', (req, res) => {
    let user = req.body;

    if (users.userLogin(user)) {
        user.token = users.createToken();
        users.updateUser(user.username, user);
        users.writeUsers().then((data) => {
            res.cookie('x-auth-token', user.token);
            return res.send(`${user.username} logged in successfully.`);
        }).catch((err) => res.status(400).send(err));
    } else {
        res.status(401).send('Username or password incorrect!');
    };
});

app.post('/logout', authenticate, (req, res) => {
    let user = req.user;

    if (!user) {
        return res.status(400).send();
    } else {
        users.deleteUserToken(user.username);
        users.writeUsers().then((data) => {
            return res.send(true);
        }).catch((err) => err);
    };
});

app.get('/parser', (req, res) => {
    let task = inlineSyntax();
    res.send(task);
});


/////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Started listenning on port ${port}`);
});

module.exports = { app };




