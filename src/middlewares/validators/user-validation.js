const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().trim().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character.",
    })
    ,
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "Confirm password is required.",
      "any.only": "Passwords do not match.",
    })
    .strip(),
});

const loginSchema = Joi.object({
  usernameOrEmail: Joi.alternatives()
    .try(Joi.string().email().required().trim(), Joi.string().required().trim())
    .messages({
      "string.empty": "Username or email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required.",
    })
    ,
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
