// *** Imports ****

const { models } = require("mongoose");
const Model = require("../models/User"); //User model

const {StatusCodes} = require("http-status-codes");
const { BadRequestError } = require("../errors");

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

// *** Lógica de negocio ***

const register = async (req, res) => {

  // *** Hash password ***
  // const {name, email, password} = req.body

  // const salt = await bcrypt.genSalt(10); //gen random byte
  // const hashedPassword = await bcrypt.hash(password, salt) // hash password and random byte


  // // temprorary user object with the hashed password
  // const tempUser = {name, email, password: hashedPassword}

  // *** Validate user info using mongoose and Save user *** 
  
  // ---> checks in the controller (no needed, mongoose will do it automatically)

  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password')
  // }

  // ---> mongoose internal checks
  const user = await Model.create({... req.body}) 


  // *** Create/Sign a token *** 
  
  const token = await jwt.sign(
    {userId: user._id, name:user.name}, // the payload is the use created/returned in/from the db
    'jwtSecert',
    {expiresIn: '30d'}
  )

  // *** Send a response (including the token) ***
  // puedo tambien mandar un mensajito, el nombre del usuario, o lo que sea
  res.status(StatusCodes.CREATED).json({
    user:{name: user.name},
  token})
}

const login = async (req, res) => {
  res.send('Login user')
}

module.exports = {
  register,
  login
}