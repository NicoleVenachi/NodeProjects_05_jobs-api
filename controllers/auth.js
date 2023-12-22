// *** Imports ****

const { models } = require("mongoose");
const Model = require("../models/User"); //User model

const {StatusCodes} = require("http-status-codes");
const { BadRequestError } = require("../errors");


// *** Lógica de negocio ***

const register = async (req, res) => {

  // *** Validate user info using mongoose *** 
  
  // checks in the controller
  // const {name, email, password} = req.body

  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name, email and password')
  // }

  const user = await Model.create({... req.body}) // mongoose internal checks

  // console.log(user);

  

  // *** Hash password ***

  // *** Create/Sign a token *** 

  // *** Send a response (including the token) ***
  
  res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
  res.send('Login user')
}

module.exports = {
  register,
  login
}