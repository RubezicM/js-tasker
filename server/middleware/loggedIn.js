let { User } = require('../models/user');

let loggedIn = (req, res, next) => {
    let token = req.cookies['x-auth-token'];

    console.log('token',token)

    if (token === undefined) {
        req.loggedIn = false;
        return next();
    };



    User.findByToken(token).then((user) => {

        if (!user) {
            req.loggedIn = false;
            next();
        } else {
            req.user = user;
            req.loggedIn = true;
            next();
        };


    }).catch((e) => {
        return console.log(e);
    });
};

module.exports = { loggedIn };
