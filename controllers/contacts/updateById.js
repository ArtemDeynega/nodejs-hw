const { Contact } = require('../../models/contact');

const { createError } = require('../../helpers');

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findOneAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = updateById;
