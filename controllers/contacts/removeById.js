const contacts = require('../../models/contacts');
const { createError } = require('../../helpers');
const removeById = async (req, res, next) => {
  const { id } = req.params;
  const results = await contacts.removeContact(id);
  if (!results) {
    throw createError(404);
  }
  res.status(200).json({ message: 'contact deleted' });
};

module.exports = removeById;
