const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')

//const connection = require('./database/db')
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const route = require('./routes/route');

// MIDDLEWAREfgcnfgngf
var corsOptions = {
	origin: function (origin, callback) {
	  if (whitelist.indexOf(origin) !== -1 || !origin) {
		callback(null, true)
	  } else {
		callback(new Error('Not allowed by CORS'))
	  }
	}
  }
  app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
	
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', route)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000

// app.get('/', (req, res) => {
//     res.send('An alligator approaches!');
// });

// app.listen(port, () => console.log('Gator app listening on port 3000!'));