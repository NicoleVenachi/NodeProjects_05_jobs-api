//  *** Imports ***

const mongoose = require('mongoose');

// *** Schema definitions ***
const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    maxlength: 50
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100
  },
  status: {
    type: String,
    enum: ['pending', 'interview', 'declined'], // alias types
    default: 'pending'
  },
  createdBy: { // link to theuser model
    type: mongoose.Types.ObjectId, // type is another schema (It JUST needs the collection ID to be created)
    ref: 'User', // name of the schema in the DB
    required: [true, 'Please provide user'],
  }
},
{timestamps: true}
)


// *** Create the model in the DB ***

const model = mongoose.model('Job', JobSchema) //coleccionAEscirbirEnLaDB, SwSchema

// *** Export the model *** 
module.exports = model 