const { User } = require("../../model");
const { Conflict } = require("http-errors");

const signup = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    // await User.create({ password, email });

    const newUser = new User({ password, email });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register",
      ResponseBody: {
        user: {
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
