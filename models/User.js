
// *** imports ***
const mongoose = require('mongoose');

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
    maxlength: 12, //una vez sea hasheado, se quitara esta limitacion
  }
})

// *** Create the model in the DB ***

const model = mongoose.model('User', UserSchema) //coleccionAEscirbirEnLaDB, SwSchema

// *** Export the model *** 
module.exports = model 