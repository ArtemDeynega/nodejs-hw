const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User } = require('../../models/user');

const { createError } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempDir, originalname } = req.file;
    const image = await Jimp.read(tempDir);
    image.resize(250, 250).writeAsync(tempDir);
    const { id } = req.user;
    if (!id) {
      throw createError(401);
    }
    const [extention] = originalname.split('.').reverse();
    const newName = `${id}.${extention}`;
    const resultDir = path.join(avatarsDir, newName);
    await fs.rename(tempDir, resultDir);
    const avatarURL = path.join('avatars', newName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
