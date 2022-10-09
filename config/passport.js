const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField:'password',
},function(email,password,done){
    User.findOne({where:{email:email}}).then(function(user){
        if(!user || !User.validatePassword(password,user.password_salt,user.password_hash)){
            return done(null,false,{errors:{'email or password':'wrong'}})
        }
        return done(null,user)
    }).catch(done)
}))

module.exports = passport