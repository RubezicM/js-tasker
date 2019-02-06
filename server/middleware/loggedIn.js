const { Users, getUsers } = require('../utils/dummy_db');
const cookieParser = require('cookie-parser');

let loggedIn = (req, res, next) => {
    let users;
    getUsers().then((data) => {
        users = new Users(data);

        let token = req.cookies['x-auth-token'];

        let user = users.findByToken(token);

        if (!user) {
            req.loggedIn = false;
            next();
        } else {
            req.user = user;
            req.loggedIn = true;
            next();
        };
    }).catch((err) => console.log(err));
};

module.exports = { loggedIn };