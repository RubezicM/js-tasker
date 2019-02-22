require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
;
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
const { parser } = require('./middleware/parser');
const { hbs } = require('./middleware/hbs');
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

app.get('/high-score', (req, res) => {
    res.render('high-score.hbs');
});

app.get('/register', loggedIn, (req, res) => {
    if (req.loggedIn) {
        res.render('logged.hbs', {
            user: req.user.username,
            message: 'registered',
            title: 'Register'
        });
    } else {
        res.render('register.hbs', {
            title: 'Register'
        });
    };
});

app.get('/main', authenticate, (req, res) => {
    res.render('main.hbs', {
        user: req.user.username,
        imgUrl: req.user.imageURL,
        combo: req.user.combo,
        title: 'Playground'
    });
});

app.get('/history', authenticate, (req, res) => {
    res.render('history.hbs', {
        user: req.user.username,
        imgUrl: req.user.imageURL
    });
});

app.get('/profile', authenticate, (req, res) => {
    res.render('profile.hbs', {
        user: req.user.username,
        password: req.user.password,
        email: req.user.email,
        basicAttempts: req.user.score.basic.attempted,
        basicSuccesses: req.user.score.basic.successful,
        basicPercentage: req.user.score.basic.percentage,
        imgUrl: req.user.imageURL,
        xp: req.user.xp,
        bestCombo: req.user.bestCombo,
        title: 'Profile'
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
        user: req.user.username,
        imgUrl: req.user.imageURL,
        imgUrl: req.user.imageURL
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

app.get('/users/check-username/:username', (req, res) => {
    User.findOne({ username: req.params.username }).then((user) => {
        if (user) {
            res.send('true');
        } else {
            res.send('false');
        };

    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users/check-email/:email', (req, res) => {
    User.findOne({ email: req.params.email }).then((user) => {
        if (user) {
            res.send('true');
        } else {
            res.send('false');
        };

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
        result: task.result,
        function: task.function,
        createdAt: new Date().getTime()
    };
    let answer = new Answer(body);

    answer.save().then((answer) => {

        setTimeout(() => {
            Answer.findOneAndUpdate({ _id: answer._id, completed: false }, {
                completed: true
            }, { new: true }).then((answer) => {
                User.updateScore(answer.creator, false, 'basic').then((user) => {
                    console.log('Answer updated.', answer._id, answer.creator, user.score, user.xp, user.combo);
                });
            }).catch((err) => {
                console.log(err);
            });
        }, 35000);

        Answer.deleteOld(req.user.username).then(() => {
            res.send({
                taskID: answer._id,
                function: task.function,
                result: task.result
            });
        });

    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.post('/answer-send', authenticate, (req, res) => {
    let body = _.pick(req.body, ['_id', 'result']);

    Answer.findOne({ _id: body._id, completed: false }).then((answer) => {
        if (answer.result.trim() === body.result) {
            Answer.findByIdAndUpdate(answer._id, {
                completed: true,
                correct: true
            }).then((answer) => {
                User.updateScore(answer.creator, true, 'basic').then((user) => {
                    res.send({ correct: true, combo: user.combo });
                });
            });
        } else {
            Answer.findByIdAndUpdate(answer._id, {
                completed: true
            }).then((answer) => {
                User.updateScore(answer.creator, false, 'basic').then((user) => {
                    res.send({ correct: false, combo: user.combo });
                });
            });
        };
    }).catch((err) => {
        res.status(404).send(err);
    });
});

app.get('/answers', authenticate, (req, res) => {
    let username = req.user.username;
    Answer.find({ creator: username }).then((answers) => {
        let sortedAnswers = _.sortBy(answers, ['createdAt']).reverse();
        res.send(sortedAnswers);
    }).catch((err) => {
        res.status(404).send(err);
    });
});

////////////////////////// High Score ////////////////////////////

app.get('/score', (req, res) => {
    User.find().then((users) => {
        users = _.sortBy(users, ['score.basic.percentage']).reverse();
        res.send(users);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

////////////////////////// Upload Image ////////////////////////////

app.post('/api/images', authenticate, parser.single("image"), (req, res) => {
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;

    User.findOneAndUpdate({ username: req.user.username }, {
        imageURL: image.url,
        imageID: image.id
    }, { new: true }).then((user) => {
        res.render('profile.hbs', {
            user: req.user.username,
            password: req.user.password,
            email: req.user.email,
            basicAttempts: req.user.score.basic.attempted,
            basicSuccesses: req.user.score.basic.successful,
            basicPercentage: req.user.score.basic.percentage,
            imgUrl: user.imageURL,
            xp: req.user.xp,
            bestCombo: req.user.bestCombo
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
});

/////////////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Started listenning on port ${port}`);
});

module.exports = { app, hbs };




