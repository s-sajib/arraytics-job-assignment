const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const userValidationSchema = require("../../models/User/userValidationSchema");

async function selfRegistration(name, email, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  const validationError = await user.validate();
  userValidationSchema.validate(user);
  const savedUser = await user.save();
  return { validationError, savedUser };
}

async function registration(name, email, password, created_by) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    created_by: created_by,
  });
  const validationError = await user.validate();
  userValidationSchema.validate(user);
  const savedUser = await user.save();
  return { validationError, savedUser };
}

module.exports = { selfRegistration, registration };
