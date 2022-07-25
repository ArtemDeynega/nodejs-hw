const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordLog = await bcrypt.compare(password, user.password);

  if (!user || !passwordLog) {
    throw createError(401, 'Email or password is wrong');
  }
  if (!user.verify) {
    throw createError(404, 'Email not verify');
  }

  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });

  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
module.exports = login;
