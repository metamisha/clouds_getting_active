const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    User.findOne({email: email}).then((user) => {
        if(!user || !user.validPassword(password)){
            return done(null, false, {errors: {'email or password': 'is invalid'}});
        }
        return done(null, user);
    }).catch(done);
}));
