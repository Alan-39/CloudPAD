const express = require('express')

const app = express()
const port = 3000


// MongoDB Connection
const db = require('./config/dbConnection');

db.once('open', () => {
  console.log("Connection successful");
});
db.on('error', err => {
  console.log(err.message);
});


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
app.use(cors({
  credentials: true,
  exposedHeaders: ['set-cookie'],
  origin: [
    'http://localhost:8080', 
    'https://localhost:8080'
  ],
}));
app.use(morgan("combined"));
app.use(session({
  secret: 'das sum very secretive secret bruh',
  cookie: {
    maxAge: 600000,
    secure: false // for testing only, HTTPS required
  },
  resave: false,
  saveUninitialized: false,
  unset: 'destroy',
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize());
app.use(passport.session());


// APIs
const Authentication = require('./api/Authentication');
const MinIO = require('./api/MinIO');

app.use("/auth", Authentication);
app.use("/minio", MinIO);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})