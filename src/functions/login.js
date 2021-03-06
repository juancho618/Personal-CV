'use strict';

var user = require('../models/user');
var bcrypt = require('bcrypt');

exports.loginUser = function (email, password) {
    return new Promise(function (resolve, reject) {

        user.find({ email: email }).then(function (users) {

            if (users.length == 0) {

                reject({ status: 404, message: 'User Not Found !' });
            } else {

                return users[0];
            }
        }).then(function (user) {

            var hashed_password = user.hashed_password;

            if (bcrypt.compareSync(password, hashed_password)) {

                resolve({ status: 200, message: email });
            } else {

                reject({ status: 401, message: 'Invalid Credentials !' });
            }
        }).catch(function (err) {
            return reject({ status: 500, message: 'Internal Server Error !' });
        });
    });
};