const yup = require("yup");

const userDataUpdateValidationSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .noUnknown();

module.exports = userDataUpdateValidationSchema;
