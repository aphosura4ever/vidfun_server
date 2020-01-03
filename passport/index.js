const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const connection = require('../database/db')

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser(function(user, done) {
    console.log('*** serializeUser called, user: ')
      console.log(user) // the whole raw user object!
    console.log('---------')
    console.log(user.USER_ID)
    done(null, user.USER_ID);
  });

// user object attaches to the request as req.user
passport.deserializeUser(function(user_id, done) {
   
    connection.query(`select USER_ID,Username from login.users where USER_ID = ${user_id}`,
      function(error,results) {
        if(error) throw(error)
        console.log('------Deserialize user, user------')
              console.log(results[0])
        console.log('--------------')
        done(null,results[0])
      }
    
      );
  
    });

//  Use Strategies 
passport.use(LocalStrategy)

module.exports = passport
