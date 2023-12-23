// *** Imports ***

const {StatusCodes} = require('http-status-codes');

const Model = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');


// *** Jobs CRUD Operations ***

const getAllJobs = async (req, res) => {

  // *** Extract the user info (eased by the auth Middleware) ***
  const userId = req.user.userId

  // *** Querying all the user jobs ***
  const jobs = await Model
    .find({createdBy: userId})
    .sort({'createdAt': -1}) // sort by date ascending

  // *** Send response ***
  res.status(StatusCodes.OK).json({jobs, nbHits: jobs.length})

}

const getJob = async (req, res) => {
  // *** Extract the JOB Id (from the URL params) and user info (eased by the auth Middleware) ***
  const {id: jobId} = req.params;
  const userId = req.user.userId;

  // *** Querying the job ***
  const job = await Model.findOne({
    _id: jobId,
    createdBy: userId // just its corresponding user can access this
  })


  // *** Checking errors ***
  if (!job) { // passed wrong id
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  // casting error (jobId didnt match Schema format)


  // *** Send response ***
  res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {

  // *** Create the job (Also using internal mongoose checks) ***
  const job = await Model.create(req.body);

  // *** Send response ***
  res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
  // *** Extract the JOB Id (from the URL params), user info (eased by the auth Middleware) and the info to update ***
  const {id: jobId} = req.params;
  const {user: userId, body: {company, position}} = req;
  
  // *** Valitation (controller checks) ***
  if (!company || !position) {
    throw new BadRequestError('Company or position fields cannot be empty');
  }
  
  // *** Updating the job (also runnig inner mongoose validators) ***
  const job = await Model.findByIdAndUpdate ({
    _id: jobId,
    createdBy: userId // just its corresponding user can access/edit this
  }, 
  req.body,
  { // patch not updated, do not passed overwrite
    new: true, 
    runValidators: true
  }
  )

  // *** Checking errors ***
  if (!job) { // passed wrong id
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  // casting error (jobId didnt match Schema format)


  // *** Send response ***
  res.status(StatusCodes.OK).json({job})
}


const deleteJob = async (req, res) => {
  res.send('Delete job')
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}