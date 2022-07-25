const register = require('./register');
const login = require('./login');
const getCurrent = require('./getCurrent');
const getLogout = require('./getLogout');
const updateAvatar = require('./updateAvatar');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
  register,
  login,
  getLogout,
  getCurrent,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
