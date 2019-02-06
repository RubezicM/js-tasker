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

class Users {
    constructor(users) {
        this.users = users;
    }
    userExists (username) {
        if (this.users.filter((element) => element.username === username).length > 0) {
            return true;
        };
        return false;
    }
    userLogin (user) {
        if (this.users.filter((element) => element.username === user.username &&
        element.password === user.password).length > 0) {
            return true;
        };
        return false;
    }
    writeUsers () {
        return new Promise((resolve, reject) => {
            fs.writeFile('./dummy_db/users.json', JSON.stringify(this.users), (err) => {
                if (err) {
                    reject(err);
                };
                resolve(this.users);
            });
        });
    }
    addUser (user) {
        if (!this.userExists(user.username)) {
            this.users.push(user);
            return user;
        }
    }
    removeUser (username) {
        let user = this.users.find((element) => element.username === username);
        if (user) {
            this.users = this.users.filter((element) => element.username !== username);
            return user;
        };
    }
};

module.exports = {
    Users,
    getUsers
};





