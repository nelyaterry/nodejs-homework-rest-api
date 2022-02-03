const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },

    avatarURL: {
      tupe: String,
    },

    varificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },

    verify: {
      type: Boolean,
      default: false,
    },
  },

  { versionKey: false, timestamps: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

const joiSchemaUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const joiUpdateSubscription = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

module.exports = {
  User,
  joiSchemaUser,
  joiUpdateSubscription,
};
