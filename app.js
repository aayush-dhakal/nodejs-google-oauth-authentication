const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
// when we refresh the page or restart the server then the app auto logsout the user. to prevent this we have to store session in mongodb. we use connect-mongo pakage for it. it must be below session pakage as we pass it in connect-mongo. then configure session in session middleware below
const MongoStore = require('connect-mongo')(session)


const connectDB = require('./config/db')

// load config
dotenv.config({
  path: './config/config.env'
})

// passport config
require('./config/passport')(passport)

connectDB()

const app = express()




// logging in console about http requests info
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// setting up .hbs extension for handlebars, and defining default layout to be main.hbs file
app.engine('hbs', exphbs({ defaultLayout: 'main',extname: '.hbs' }))
app.set('view engine', '.hbs')

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// session middleware. this must be above passport middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if nothing is modified
  saveUninitialized: false, // don't create session until something is stored
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }) // this creates a new collection named session in db and stores session for logged in user. if we log out then if destroys the session for that user
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


// routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use((req, res) => { res.render('error/404') })


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))