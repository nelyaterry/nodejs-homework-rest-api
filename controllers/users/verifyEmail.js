const { NotFound } = require("http-errors");
const { User } = require("../../model");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NotFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({
      message: "Verify success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
