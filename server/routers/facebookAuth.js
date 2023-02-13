const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookAuth = require("../moduls/facebookAuthDb.js");

passport.serializeUser(function (user, done) {

    done(null, user);
});

passport.deserializeUser(function (user, done) {

    done(null, user);
});


passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.CLIENT_SECRET_FB,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: true

    },
    function (request, accessToken, refreshToken, profile, callback) {

        let facebookId = profile.id;
        let name = profile.displayName
        let regFb = new FacebookAuth(facebookId, name)
        regFb.facebookAuth(facebookId)
            .then(result => {
                console.log(result)
                return callback(null, profile)
            })
            .catch(err => {
                return err
            });
    }
));