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
    }),
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
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

const updateUserSchema = Joi.object({
  fullName: Joi.string().trim().allow(null, "").messages({}),
  mobilePhone: Joi.string()
    .trim()
    .pattern(/^[0-9]+$/)
    .allow(null, "")
    .messages({
      "string.pattern.base": "Mobile phone must contain only numbers.",
    }),
})
  .or("fullName", "mobilePhone")
  .messages({
    "object.missing": "At least one of the credentials must be present.",
  });

const createAddressSchema = Joi.object({
  addressLine1: Joi.string().required().trim().messages({
    "string.empty": "Address line 1 is required.",
  }),
  addressLine2: Joi.string().trim().messages({}),
  city: Joi.string().required().trim().messages({
    "string.empty": "City is required.",
  }),
  postalCode: Joi.string().required().trim().messages({
    "string.empty": "Postal code is required.",
  }),
});

const updateAddressSchema = Joi.object({
  addressLine1: Joi.string().trim().messages({}),
  addressLine2: Joi.string().trim().messages({}),
  city: Joi.string().trim().messages({}),
  postalCode: Joi.string().trim().messages({}),
});

exports.validateCreateAddress = validate(createAddressSchema);
exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
exports.validateUpdateUser = validate(updateUserSchema);
