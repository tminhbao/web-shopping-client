const db = require('../configs/connect');
const bcrypt = require('bcryptjs');

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check username is exist or not
            let check = await checkExistUser(data.username);
            if (check) {
                reject(`This username "${data.username}" has already exist. Please choose an other username`)
            } else {
                // Hash the user password 
                let salt = bcrypt.genSaltSync(10);
                let userItem = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    username: data.username,
                    mob_no: data.mob_no,
                    password: bcrypt.hashSync(data.password, salt),
                };

                //create a new account
                db.query(
                    ' INSERT INTO users set ? ', userItem, (err, rows) => {
                        if (err) {
                            reject(err)
                        }
                        resolve("Create a new user successful");
                    }
                );
            }
        } catch (e) {
            reject(e);
        }
    });
};

let checkExistUser = (username) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(` SELECT * FROM users WHERE username = '${username}'`, (err, rows) => {
                if (err) {
                    reject(err)
                }
                if (rows.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    createNewUser: createNewUser,
    checkExistUser: checkExistUser
};