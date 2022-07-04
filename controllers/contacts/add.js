const contacts = require('../../models/contacts');
const { contactAddSchema } = require('../../schemas');
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw createError(400, 'missing required name field');
  }
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};
module.exports = add;
