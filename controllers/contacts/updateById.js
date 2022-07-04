const contacts = require('../../models/contacts');
const { contactAddSchema } = require('../../schemas');
const { createError } = require('../../helpers');

const updateById = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw createError(400, 'missing fields');
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = updateById;
