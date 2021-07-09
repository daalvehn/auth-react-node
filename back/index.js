const express = require('express');
const app = express();
const port = process.env.PORT || 4040;
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./routes/auth')
const loginRouter = require('./routes/login')
const pool = require('./conf');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use('/', homeRouter)
// app.use('/courses', coursesRouter)

pool.getConnection((err) => {
  if (err) {
    console.error('error connecting to db', err);
  } else {
    console.log('connected to db');
  }
});

app.use('/register', authRouter)
app.use('/login', loginRouter)

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something had happened', err)
  }
  console.log(`server is listening on port ${port}`)
});
