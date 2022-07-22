const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
/// ХЕШ
// const bcrypt = require('bcryptjs');
// const hashInvoke = async passwprd => {
//   const salt = await bcrypt.genSalt(10);
//   const hashPassword = await bcrypt.hash(passwprd, salt);
//   // console.log(hashPassword);
//   const compareResult = await bcrypt.compare(passwprd, hashPassword);
//   console.log(compareResult);
// };
// hashInvoke('123456');
/// ;

// TOKEN
// const jwt = require('jsonwebtoken');
// const payload = {
//   id: '62d9c2589500717b1231e653',
// };
// const { SECRET_KEY } = process.env;

// const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
// // console.log(token);
// const decodeToken = jwt.decode(token);
// // console.log(decodeToken);
// try {
//   const verifyResult = jwt.verify(token, SECRET_KEY);
//   // console.log(verifyResult);
// } catch (error) {
//   console.log(error.message);
// }

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
