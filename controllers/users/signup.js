const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../model");
const { sendEmailMeta } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const avatarURL = gravatar.url(email);

    const varificationToken = nanoid();

    const newUser = new User({ password, email, avatarURL, varificationToken });
    newUser.setPassword(password);
    newUser.save();

    const emailVerification = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:4002/api/users/verify/${varificationToken}>Подтверждение регистрации на сайте</a>`,
    };

    await sendEmailMeta(emailVerification);

    res.status(201).json({
      status: "success",
      code: 201,
      message: "Success register",
      ResponseBody: {
        user: {
          email,
          avatarURL,
          varificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
