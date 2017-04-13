'use strict';

const user = require('../models/user');
const bcrypt = require('bcrypt');


exports.registerUser = function (name, email, password) {
    return new Promise(function (resolve, reject) {

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        var newUser = new user({

            name: name,
            email: email,
            hashed_password: hash,
            created_at: new Date()
        });

        newUser.save().then(function () {
            return resolve({ status: 201, message: 'User Registered Sucessfully !' });
        }).catch(function (err) {

            if (err.code == 11000) {

                reject({ status: 409, message: 'User Already Registered !' });
            } else {

                reject({ status: 500, message: 'Internal Server Error !' });
            }
        });
    });
};