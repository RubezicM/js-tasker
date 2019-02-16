require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-hbs');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const { mongoose } = require('./db/mongoose');
const { Answer } = require('./models/answer');
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
        password: req.user.password,
        email: req.user.email,
        basicAttempts: req.user.score.basic.attempted,
        basicSuccesses: req.user.score.basic.successful,
        basicPercentage: req.user.score.basic.percentage
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
    let body = _.pick(req.body, ['username', 'password', 'email']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.cookie('x-auth-token', token);
        return res.send(user);
    }).catch((err) => {
        if (err.errmsg) {
            err = err.errmsg;
        } else if (err.message) {
            err = err.message;
        };
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

app.patch('/users', authenticate, (req, res) => {
    let username = req.user.username;
    let body = _.pick(req.body, ['email', 'username']);

    User.findOneAndUpdate({ username },
        body,
        { new: true, runValidators: true }).then((user) => {
            if (!user) {
                res.status(404).send('User not found!');
            };
            res.send(user);
        }).catch((err) => {
            if (err.message) {
                err = err.message;
            };
            res.status(400).send(err);
        });
});

app.patch('/users/password', authenticate, (req, res) => {
    let username = req.user.username;
    let body = _.pick(req.body, ['oldPassword', 'newPassword']);
    if (body.newPassword.length < 4) {
        return res.status(400).send('New password must be 4 characters or longer!');
    };

    User.findByCredentials(username, body.oldPassword).then((user) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(body.newPassword, salt, (err, hash) => {
                let newPassword = hash;
                User.findOneAndUpdate({ username },
                    { password: newPassword },
                    { new: true, runValidators: true }).then((user) => {
                        user.generateAuthToken().then((token) => {
                            res.cookie('x-auth-token', token);
                            res.send(user);
                        });
                    });
            });
        });
    }).catch((err) => {
        res.status(400).send(err);
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

////////////////////////// Answer ////////////////////////////

app.post('/answer', authenticate, (req, res) => {
    let assignment = pickTask();
    let commentsRandomization = commentsSyntax(assignment).function;
    let task = inlineSyntax(commentsRandomization);

    let body = {
        creator: req.user.username,
        result: task.result
    };
    let answer = new Answer(body);

    answer.save().then((answer) => {

        setTimeout(() => {
            Answer.deleteOne({ _id: answer._id }).then((answer) => {
                if (answer.n === 0) {
                    return console.log('No message present. Nothing done.');
                }
                console.log('Answer deleted', answer);
                User.updateScore(body.creator, false, 'basic').then((user) => {
                    console.log('User score updated:', user.score);
                });
            }).catch((err) => {
                console.log('Error deleting answer', err);
            });

        }, 35000);

        res.send({
            taskID: answer._id,
            function: task.function,
            result: task.result
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post('/answer-send', authenticate, (req, res) => {
    let body = _.pick(req.body, ['_id', 'result']);

    Answer.findByIdAndDelete({ _id: body._id }).then((answer) => {
        if (answer.result.trim() === body.result) {
            User.updateScore(answer.creator, true, 'basic').then((user) => {
                console.log(user.score);
                res.send({ correct: true });
            });
        } else {
            User.updateScore(answer.creator, false, 'basic').then((user) => {
                console.log(user.score);
                res.send({ correct: false });
            });
        };
    }).catch((err) => {
        res.status(400).send(err);
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




