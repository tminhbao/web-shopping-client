const db = require('../configs/connect');
const bcrypt = require('bcryptjs')

let handleLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        //check username is exist or not
        let user = await findUserByUser(username);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user username "${username}" doesn't exist`);
        }
    });
};


let findUserByUser = (username) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                ' SELECT * FROM `users` WHERE `username` = ?  ', username,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(
                ' SELECT * FROM `users` WHERE `id` = ?  ', id,
                function(err, rows) {
                    if (err) {
                        reject(err)
                    }
                    let user = rows[0];
                    resolve(user);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};

let comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    resolve(`The password that you've entered is incorrect`);
                }
            });
        } catch (e) {
            reject(e);
        } 
    });
};

module.exports = {
    handleLogin: handleLogin,
    findUserByUser: findUserByUser,
    findUserById: findUserById,
    comparePassword: comparePassword
};