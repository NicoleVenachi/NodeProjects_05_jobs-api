
// *** imports ***
require('dotenv').config();
require('express-async-errors');

const express = require('express');

// middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

// connect DB
const connectDB = require('./db/connect');
// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// *** inicializo express app y agrego JSON middleware ***
const app = express();

app.use(express.json());
// extra packages

// *** routes ***
app.use('/api/v1/auth', authRouter); // a futuro domin/api/...
app.use('/api/v1/jobs', authenticateUser,jobsRouter);

// *** middlewares ***
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// *** servr running (async start function to run after the db connection) ***

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
