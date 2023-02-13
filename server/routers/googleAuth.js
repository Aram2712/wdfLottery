const passport = require('passport');
const GoogleAuth = require("../moduls/googleAuthDb.js");
const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (user, done) {

    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    }, function (request, accessToken, refreshToken, profile, callback) {
        let googleId = profile.id,
            name = profile.displayName,
            email = profile.email

        let regGoogle = new GoogleAuth(googleId, name, email)
        regGoogle.googleAuth(googleId)
            .then(result => {
                return callback(null, profile)
            })
            .catch(err => {
                return err
            });
        return callback(null, profile)
    }
))
