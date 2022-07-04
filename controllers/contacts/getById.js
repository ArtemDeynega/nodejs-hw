const contacts = require('../../models/contacts');
const { createError } = require('../../helpers');
const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = getById;
