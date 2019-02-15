require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-hbs');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');
const { loggedIn } = require('./middleware/loggedIn');
const { inlineSyntax } = require('./parser/inline/inline-syntax');
const { commentsSyntax } = require('./parser/comments/comments-syntax');
const { pickTask } = require('./parser/tasks/basic');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(bodyParser.json());
app.use(express.static(publicPath));


app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

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
    let body = _.pick(req.body, ['username', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.cookie('x-auth-token', token);
        return res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.delete('/users', authenticate, (req, res) => {
    let username = req.user.username;
    User.deleteOne({ username }).then((user) => {
        res.send({
            text: 'Account deleted.',
            user
        }).catch((err) => res.status(404).send(err));
    });
});

app.get('/users/:username', authenticate, (req, res) => {
    let username = req.params.username;
    if (username !== req.user.username) {
        return res.status(401).send('Not authorised to see this user');
    };

    User.findOne({ username }).then((user) => {
        res.send(user);
    }).catch((err) => res.status(404).send('User not found!'));
});

app.post('/login', (req, res) => {
    let bodyUser = req.body;

    User.findByCredentials(bodyUser.username, bodyUser.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.cookie('x-auth-token', token);
            res.send(`${user.username} logged in successfully.`);
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.delete('/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


////////////////////////////////////////////////////

app.get('/parser', (req, res) => {
    let assignment = pickTask();
    let commentsRandomization = commentsSyntax(assignment).function;
    let task = inlineSyntax(commentsRandomization);
    res.send(task);
});


/////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Started listenning on port ${port}`);
});

module.exports = { app };




