require('./config/db')

const app = require('express')()
const cors = require('cors')
const bodyParser = require('express').json
const routes = require('./routes')
const { errorLogger, errorResponder, invalidPathHandler, errorFormatter } = require('./utils')

app.use(cors())

app.use(bodyParser())

app.use(routes)

// Attach the first Error handling Middleware
// function defined above (which formats the error)
app.use(errorFormatter)

// Attach the second Error handling Middleware
// function defined above (which logs the error)
app.use(errorLogger)

// Attach the third Error handling Middleware
// function defined above (which sends back the response)
app.use(errorResponder)

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
app.use(invalidPathHandler)

module.exports = app