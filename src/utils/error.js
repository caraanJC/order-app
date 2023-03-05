module.exports.errorFormatter = (error, request, response, next) => {
    if (error.message.includes('E11000 duplicate key error')) {
        error.message = `${error.collectionName ? error.collectionName : "Entry"} already exists.`
    }

    next(error) // calling next middleware
}

// Error handling Middleware function for logging the error message
module.exports.errorLogger = (error, request, response, next) => {
    console.log(`error ${error.message}`)

    next(error) // calling next middleware
}
  
  // Error handling Middleware function reads the error message 
  // and sends back a response in JSON format
module.exports.errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json')
        
    const status = error.status || 400
    response.status(status).send(error.message)
}
  
// Fallback Middleware function for returning 
// 404 error for undefined paths
module.exports.invalidPathHandler = (request, response, next) => {
    response.status(404)
    response.send('invalid path')
}