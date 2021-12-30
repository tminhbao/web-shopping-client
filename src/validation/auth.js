const check = require("express-validator").check;
let validateRegister = [
  check("email", "Invalid email").isEmail().trim().isLength({ min: 3 }),
  check(
    "password",
    "Invalid password. Password must be at least 6 chars long"
  ).isLength({ min: 6 }),
  check(
    "passwordConfirm",
    "Password confirmation does not match password"
  ).custom((value, { req }) => {
    return value === req.body.password;
  }),
];
let validateLogin = [
  check("email", "Invalid email").isEmail().trim(),
  check("password", "Invalid password").not().isEmpty(),
];

module.exports = {
  validateRegister: validateRegister,
  validateLogin: validateLogin,
};
