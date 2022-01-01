// CloudPAD - Cloud Personal Accessible Drive

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

// Routes


app.get('/', (req, res) => {
  res.send({
    respond: "bruhwtf"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})