const { Contact } = require('../../models/contact');

const add = async (req, res) => {
  const { id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};
module.exports = add;
