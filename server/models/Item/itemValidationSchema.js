const yup = require("yup");

const itemValidationSchema = yup
  .object({
    name: yup.string().required(),
    created_at: yup.date().default(() => new Date()),
    created_by: yup.string().required(),
  })
  .noUnknown();

module.exports = itemValidationSchema;
