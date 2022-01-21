const { Contact } = require("../../model");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  console.log(favorite);

  const skip = (page - 1) * limit;
  try {
    const result = await Contact.find({ owner: _id, favorite: favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");

    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
