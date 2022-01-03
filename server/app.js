const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 3000

// Middleware
app.use(bodyParser.json());
app.use(cors())
app.use(morgan("combined"))

// APIs
const Authentication = require('./api/Authentication');

app.use("/", Authentication);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})