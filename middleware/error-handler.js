
//  *** Imports ***
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


// *** Handler ***


const errorHandlerMiddleware = (err, req, res, next) => {
  

  // *** creating new error objects to handle errors from mongoose and from inner server state *** 
  let customError = {
    // set default values for server errors

    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // si ya hat algo, lo maniene
    msg: err.message || 'Something went wrong, try again later'
  }


  // *** Checkings and updating de status code accoring to mongose error ***
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  if (err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
