const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');
const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id, '-createdAt -updatedAt');
  if (!contact) {
    throw createError(404);
  }
  res.json(contact);
};

module.exports = getById;
