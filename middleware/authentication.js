
// *** Imports ****

const {UnauthenticatedError } = require("../errors");

const UserModel = require("../models/User"); //User model
const jwt = require("jsonwebtoken")
require('dotenv').config();

// *** Middleware ***

const auth = async function (req,res, next) {
  
  // access the header
  const authHeader = req.headers.authorization

  // check if header exists
  // cehck if it follows the patter (Bearer)
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Auhtentication invalid")
  }

  // extract the token
  const token = authHeader.split(" ")[1];

  //validate the token
  try {
    
    const payload = jwt.verify(token, process.env.JWT_SECRET) // get token payload

    // otra opcion, buscan el user a partir de la DB, sacando unicamente el id del token. Antes de enviarlo, quitamos el password de las columnas traidas (con el -select)
    // const user = UserModel.findById(payload.id).select('-password')
    // req.user = user

    req.user = {userId: payload.userId, name: payload.name} //atach the user to the request (in the job route for this case)

    next(); // lauch next middleware
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route")
  }
  
}

module.exports = auth;