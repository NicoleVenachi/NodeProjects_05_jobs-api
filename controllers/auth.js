// *** Imports ****

const { models } = require("mongoose");
const Model = require("../models/User"); //User model

const {StatusCodes} = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

// *** Lógica de negocio ***

const register = async (req, res) => {

  // *** Hash password ***
  // internamente lo hace el mongoose middleware


  // *** Validate user info using mongoose and Save user *** 
  // ---> checks in the controller (no needed, mongoose will do it automatically)
  // ---> mongoose internal checks
  const user = await Model.create({... req.body}) 


  // *** Create/Sign a token *** 
  const token = user.createJWT(); // instance mehtod, los INVOCO en instancias del schema


  // *** Send a response (including the token) ***
  // puedo tambien mandar un mensajito, el nombre del usuario, o lo que sea
  res.status(StatusCodes.CREATED).json({
    user:{name: user.getName()},
    token
  })
}

const login = async (req, res) => {
  // *** Validate credentials ***
  // ---> checks in the controller
  const {email, password} = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide an email and password')
  }


  // *** Quering the user  *** 
  const user = await Model.findOne({email}) // 


  // *** Checking if credentials are okay ***
  if (!user) { // user exists verification
    throw new UnauthenticatedError('Invalid credentials')
  }

  // password verification/comparation
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  // *** Sing a token for the user authorization ***
  const token = user.createJWT();


  // *** Sending a response ***
  res.status(StatusCodes.OK).json({
    user: {name: user.getName()}, 
    token
  });
}

module.exports = {
  register,
  login
}