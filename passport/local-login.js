"use strict";

const jwt = require("jsonwebtoken"),
      User = require("mongoose").model("User"),
      PassportLocalStrategy = require("passport-local").Strategy,
      config = require("../config");

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    // find a user by email address
    return User.findOne({
        email: userData.email
    }, (err, user) => {
        if(err) return done(err);

        if(!user) {
            const error = new Error('Incorrect email or password');
            err.name = "IncorrectCredentialsError";

            return done(error);
        }

        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if(err) return done(err);

            if(!isMatch) {
                const error = new Error("Incorrect email or password");
                error.name = "IncorrectCredentialsError";

                return done(error);
            }

            const payload = {
                sub: user._id
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
                name: user.name
            };

            return done(null, token, data);
        });
    });
});