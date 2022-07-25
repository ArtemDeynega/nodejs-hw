const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const router = express.Router();
const { validation, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post(
  '/verify/',
  validation(schemas.emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  '/signup',
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.getLogout));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
