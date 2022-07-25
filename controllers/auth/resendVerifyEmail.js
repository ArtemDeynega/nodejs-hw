const { User } = require('../../models/user');
const { createError, sendMail } = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw createError(404, 'Missing required field email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.verify) {
    throw createError(400, 'Verification has already been passed');
  }

  const mail = {
    to: email,
    subject: 'Підтвердження реєстрації на сайті',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Натисніть для підтвердження реєстрації</a>`,
  };
  await sendMail(mail);

  res.status(200).json({
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
