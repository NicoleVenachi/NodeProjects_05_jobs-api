// *** Imports ***

const {StatusCodes} = require('http-status-codes');

const Model = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');


// *** Jobs CRUD Operations ***

const getAllJobs = async (req, res) => {
  res.send('Get all jobs')
}

const getJob = async (req, res) => {
  res.send('Get job')
}

const createJob = async (req, res) => {
  
  // *** Extract the user info (eased by the auth Middleware) ***
  req.body.createdBy = req.user.userId


  // *** Create the job (Also using internal mongoose checks) ***
  const job = await Model.create(req.body);

  // *** Send response ***
  res.status(StatusCodes.OK).json({job})
  // BadRequestError
  // NotFoundError
}
const updateJob = async (req, res) => {
  res.send('Update job')
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