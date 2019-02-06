const { Users, getUsers } = require('../utils/dummy_db');
const cookieParser = require('cookie-parser');

let loggedIn = (req, res, next) => {
    let users,
    user;
    getUsers().then((data) => {
        users = new Users(data);

        let token = req.cookies['x-auth-token'];

        if (token !== undefined) {
            user = users.findByToken(token);
        }

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