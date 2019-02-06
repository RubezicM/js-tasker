const fs = require('fs');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./dummy_db/users.json', (err, data) => {
            if (err) {
                reject(err);
            };
            resolve(JSON.parse(data));
        });
    });
};


const userExists = (user, users) => {
    if (users.filter((element) => element.username === user.username).length > 0) {
        return true;
    };
    return false;
};

const userLogin = (user, users) => {
    if (users.filter((element) => element.username === user.username &&
    element.password === user.password).length > 0) {
        return true;
    };
    return false;
};

const writeUsers = (users) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dummy_db/users.json', JSON.stringify(users), (err) => {
            if (err) {
                reject(err);
            };
            resolve(users);
        });
    });
};

module.exports = {
    getUsers,
    userExists,
    writeUsers,
    userLogin
};





