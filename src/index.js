const server = require('./server')

const port = process.env.PORT || 3001

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

startServer()