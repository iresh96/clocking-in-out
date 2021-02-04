const path = require('path')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login');
const flash = require('connect-flash')
const session = require('express-session')

const morgan = require('morgan')

//Load Config
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Morgan Logger Config
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//Logging
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}


// Handlebars Helpers
const {formatDate,findOverTime,ifClockOut} = require('./helpers/hbs')
  
// Handlebars
app.engine('.hbs',exphbs({helpers:{formatDate,findOverTime,ifClockOut},defaultLayout:'main',extname: '.hbs'}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
  secret:'tecxila',
  resave:true,
  saveUninitialized:true,
}))

//Passport Config
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash())

//Global variables
app.use((req,res,next) => {
  res.locals.msg_in = req.flash('msg_in')
  res.locals.msg_out = req.flash('msg_out')
  next()
})



//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routers
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/admin',require('./routes/admin'))

const PORT = process.env.PORT || 5000


app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  )