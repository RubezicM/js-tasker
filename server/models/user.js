const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    imageURL: {
        type: String
    },
    imageID: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    score: {
        basic: {
            attempted: {
                type: Number,
                required: false,
                default: 0
            },
            successful: {
                type: Number,
                required: false,
                default: 0
            },
            percentage: {
                type: Number,
                required: false,
                default: 0
            }
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['username', 'score']);
};

userSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.removeToken = function (token) {
    let user = this;

    return user.updateOne({
        $pull: {
            tokens: { token }
        }
    });
};

userSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    };

    return User.findOne({
        _id: decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    });
};

userSchema.statics.updateScore = function (username, correct, level) {
    let User = this;

    return User.findOne({ username }).then((user) => {
        ++user.score[level].attempted;
        if (correct) {
            ++user.score[level].successful;
        };
        let percentage = user.score[level].successful / user.score[level].attempted * 100;
        user.score[level].percentage = percentage.toFixed(0);
        return user.save().then((user) => {
            return Promise.resolve(user);
        });
    }).catch((err) => {
        return Promise.reject(err);
    });
};

userSchema.statics.findByCredentials = function (username, password) {
    let User = this;

    return User.findOne({ username }).then((user) => {
        if (!user) {
            return Promise.reject('Username not found!');
        };

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                res ? resolve(user) : reject('Password invalid!');
            });
        });
    });
};

userSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    };
});

const User = mongoose.model('User', userSchema);


module.exports = { User };