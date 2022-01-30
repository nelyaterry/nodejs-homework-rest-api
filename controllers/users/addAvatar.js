const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../model");

const addAvatar = async (req, res, next) => {
  const { path: uploadDir, originalname } = req.file;
  const { _id: id } = req.user;
  const imageNane = `${id}_${originalname}`;
  const avatarDir = path.join(
    __dirname,
    "../../",
    "public",
    "avatars",
    imageNane
  );
  try {
    const image = await Jimp.read(uploadDir);
    image.resize(250, 250).write(uploadDir);
    await fs.rename(uploadDir, avatarDir);
    const avatarURL = path.join("public", "avatars", imageNane);
    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(uploadDir);
    next(error);
  }
};

module.exports = addAvatar;
