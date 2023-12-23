
// *** imports ***
const mongoose = require('mongoose');

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

// *** SW Schemas definition ***
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide an e-mail address'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid e-mail address'
    ], // regex to vlaidate e-mail
    unique: true // creates a unique idx
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    // maxlength: 12, //una vez sea hasheado, se quitara esta limitacion
  }
})

// *** Mongose middleware ***
UserSchema.pre('save', async function (next) {
  // no uso arrow functions por el .thisn, que aqui apunta al doucment

  const salt = await bcrypt.genSalt(10); //gen random byte

  this.password = await bcrypt.hash(this.password, salt) // hash password and random byte

  next()
})

// *** Mongose Schema Instance Methods ***
UserSchema.methods.getName = function () {
  return this.name;
}

UserSchema.methods.createJWT = function () {

  return jwt.sign(
    {userId: this._id, name:this.name}, // the payload is the use created/returned in/from the db
    'jwtSecert',
    {expiresIn: '30d'}
  )
}

// *** Create the model in the DB ***

const model = mongoose.model('User', UserSchema) //coleccionAEscirbirEnLaDB, SwSchema

// *** Export the model *** 
module.exports = model 