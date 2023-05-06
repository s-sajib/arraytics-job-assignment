const yup = require("yup");

const userValidationSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    created_at: yup.date().default(() => new Date()),
    created_by: yup.string().optional(),
  })
  .noUnknown();

module.exports = userValidationSchema;
