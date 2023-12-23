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
  res.send('Login user')
}

module.exports = {
  register,
  login
}