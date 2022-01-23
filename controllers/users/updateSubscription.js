const { NotFound } = require("http-errors");
const { User } = require("../../model");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!user) {
    throw new NotFound("User is not found");
  }
  res.json({
    status: "success",
    code: 200,
    ResponseBody: {
      user: {
        user,
      },
    },
  });
};

module.exports = updateSubscription;
