
//  *** Imports ***
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


// *** Handler ***


const errorHandlerMiddleware = (err, req, res, next) => {
  

  // *** creating new error objects to handle errors from mongoose and from inner server state *** 
  let customError = {
    // set default values for server errors nad customAPIErrors

    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // si ya hat algo, lo maniene
    msg: err.message || 'Something went wrong, try again later'
  }

  // esto ahora lo maneja el customError
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  // *** Checkings and updating de status code accoring to mongose error ***

  if (err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = StatusCodes.BAD_REQUEST
  } // duplicated errors

  if (err.name === "ValidationError") { 
    // check for mutile keys/fields validation erros
    customError.msg = Object.values(err.errors)
      .map (item => item.message)
      .join(', '); // creo un array con el mensaje de cada error, luego lo paso a string, separados por ,

    customError.statusCode = StatusCodes.BAD_REQUEST
  }  // validation errors

  if (err.name === "CastError"){
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = StatusCodes.NOT_FOUND
  } // cast errors (Sintax doesn't match exctly what mongoose is looking for)

  // *** Send response ***

  // return res.status(customError.statusCode).json({ err }) // to check the entire object and create customizes messages/satus accordingly
  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
