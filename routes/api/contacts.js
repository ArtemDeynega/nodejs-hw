const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');

const { validation, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', validation(schemas.contactAddSchema), ctrlWrapper(ctrl.add));

router.delete('/:id', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:id', isValidId, ctrlWrapper(ctrl.updateById));
router.patch(
  '/:id/favorite',
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
