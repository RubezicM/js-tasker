let { User } = require('../models/user');

let authenticate = (req, res, next) => {
    let token = req.cookies['x-auth-token'];

    User.findByToken(token).then((user) => {
        if (!user) {
            return res.status(401).render('not-logged');
        };

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).render('not-logged');
    });
};

module.exports = { authenticate };