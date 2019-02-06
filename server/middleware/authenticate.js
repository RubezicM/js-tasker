const { Users, getUsers } = require('../utils/dummy_db');
const cookieParser = require('cookie-parser');

let authenticate = (req, res, next) => {
    let users;
    getUsers().then((data) => {
        users = new Users(data);

        let token = req.cookies['x-auth-token'];
        
        if (!token) {
            return res.status(401).render('not-logged');
        };

        let user = users.findByToken(token);

        if (user) {
            req.user = user;
            req.token = token;
            next();
        } else {
            res.status(401).render('not-logged');
        };
    }).catch((err) => console.log(err));
};

module.exports = { authenticate };