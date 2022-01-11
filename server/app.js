const express = require('express')

const app = express()
const port = 3000


// MongoDB Connection
const db = require('./config/dbConnection');

db.once('open', () => {
  console.log("Connection successful")
});
db.on('error', err => {
  console.log(err)
})


// Middleware
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require("./config/passportSetUp");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined"));
app.use(session({
  secret: 'das sum very secretive secret bruh',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

// APIs
const Authentication = require('./api/Authentication');

app.use("/", Authentication);


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})