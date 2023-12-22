// *** imports ***

const express = require('express');

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

// *** inicializo router ***
const router = express.Router();

// *** Routing ***

router.get('/', getAllJobs);
router.get('/:id', getJob);

router.post('/', createJob);

router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);


module.exports = router;
