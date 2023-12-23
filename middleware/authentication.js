
// *** Imports ****

const {UnauthenticatedError } = require("../errors");

const UserModel = require("../models/User"); //User model
const jwt = require("jsonwebtoken")

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
    const payload = jwt.verify(token, process.env.SECRET_JWT) // get token payload

    req.user = {userId: payload.userId, name: payload.name} //atach the user to the request

    next(); // lauch next middleware
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route")
  }
  
}

module.exports = auth;