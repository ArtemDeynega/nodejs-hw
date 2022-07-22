const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const router = express.Router();
const { validation, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post(
  '/signup',
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.getLogout));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
