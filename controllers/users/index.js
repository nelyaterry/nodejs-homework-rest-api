const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscription = require("./updateSubscription");
const addAvatar = require("./addAvatar");
const verifyEmail = require("./verifyEmail");
const verifyRepeat = require("./verifyRepeat");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  addAvatar,
  verifyEmail,
  verifyRepeat,
};
