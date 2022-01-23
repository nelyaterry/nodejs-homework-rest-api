const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../model");

const signup = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const avatarURL = gravatar.url(email);
    // await User.create({ password, email });

    const newUser = new User({ password, email, avatarURL });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register",
      ResponseBody: {
        user: {
          email,
          avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
