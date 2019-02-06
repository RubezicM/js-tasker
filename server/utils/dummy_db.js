const fs = require('fs');
const _ = require('lodash');

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
    userExists(username) {
        if (this.users.filter((element) => element.username === username).length > 0) {
            return true;
        };
        return false;
    }
    userLogin(user) {
        if (this.users.filter((element) => element.username === user.username &&
            element.password === user.password).length > 0) {
            return true;
        };
        return false;
    }
    writeUsers() {
        return new Promise((resolve, reject) => {
            fs.writeFile('./dummy_db/users.json', JSON.stringify(this.users), (err) => {
                if (err) {
                    reject(err);
                };
                resolve(this.users);
            });
        });
    }
    addUser(user) {
        if (!this.userExists(user.username)) {
            this.users.push(user);
            return user;
        }
    }
    removeUser(username) {
        let user = this.users.find((element) => element.username === username);
        if (user) {
            this.users = this.users.filter((element) => element.username !== username);
            return user;
        };
    }
    getUser(username) {
        let user = this.users.find((element) => element.username === username);

        return user;
    }
    createToken() {
        let token = new Date().getTime().toString();
        return token + _.random(1000, 9999);
    }
    updateUser(username, newUserData) {
        if (this.userExists(username)) {
            this.removeUser(username);
            this.addUser(newUserData);
            return this.getUser(newUserData.username);
        }
    }
    addToken(username, token) {
        if (this.userExists(username)) {
            let user = this.getUser(username);
            user.token = token;
            return this.updateUser(username, user);
        }
    }
    findByToken(token) {
        let user = this.users.find((element) => element.token === token);
        if (user) {
            return user;
        };
    }
    deleteUserToken(username) {
        let user = this.getUser(username);
        if (user) {
            delete user.token;
            this.updateUser(username, user);
            return user;
        };
    }
};

// let users;
// getUsers().then((data) => {
//     users = new Users(data);
//     users.addToken('user', '15494506890642822');
//     console.log(users);
//     console.log(users.findToken('user', '15494506890642822'));
// }).catch((err) => console.log(err));


module.exports = {
    Users,
    getUsers
};





