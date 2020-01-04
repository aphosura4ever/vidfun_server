const connection = require('../database/db')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

async function checkPassword(password,hash) {
  const match = await bcrypt.compare(password, hash);
  console.log("password"+password)
  console.log("hash"+ hash)
  console.log("match" + match)
  return match
 }

  const strategy = new LocalStrategy(
	{
		usernameField: 'username' // not necessary, DEFAULT
	},
	function(username, password, done) {
    
    console.log('Local Strategy Logic: ')
    connection.query(`SELECT USER_ID,Username,Password FROM login.users where Username =  '${username}'`,
    function(error,results,fields) {
      if(error) throw error
       console.log(results)
       

      
      if(!results[0]){
        return done(null,false, {message: 'Incorrect username'})
      } 

      bcrypt.compare(password, results[0].Password).then( passwordMatch => { 
     if (!passwordMatch) {
        console.log("pw don t match")
				return done(null, false, { message: 'Incorrect password' })
			}
      
			return done(null, {USER_ID:results[0].USER_ID, Username:results[0].Username})
    })
    
    }
  
    );
        })
        
module.exports = strategy