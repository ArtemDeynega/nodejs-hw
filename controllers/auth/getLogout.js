const { User } = require('../../models/user');
const getLogout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204, 'No Conect').json();
};

module.exports = getLogout;
