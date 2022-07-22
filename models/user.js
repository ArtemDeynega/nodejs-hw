const { Schema, model } = require('mongoose');
const Joi = require('joi');
const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,

      match: emailRegex,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegex).required(),
  subscription: Joi.string(),
  token: Joi.string(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().pattern(emailRegex).required(),
  token: Joi.string(),
});

const User = model('user', userSchema);
const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
