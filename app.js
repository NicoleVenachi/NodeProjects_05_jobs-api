
// *** imports ***
require('dotenv').config();
require('express-async-errors');

const express = require('express');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')



// middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

// connect DB
const connectDB = require('./db/connect');
// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// *** inicializo express app y agrego JSON middleware, asi com security middlewares ***
const app = express();

app.set('trust proxy', 1); // para reverse-proxy apps (e.g., para Heroku)
app.use(
  rateLimiter(
    {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    }
  )
); // seting up time, how long and how many requeests

app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(xss());

// *** routes ***

app.get('/', (req, res)=> {
  res.send('Jobs api')
})// dummy route, to see if it works ok

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
