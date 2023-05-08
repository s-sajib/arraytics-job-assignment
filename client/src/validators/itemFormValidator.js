import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string("Please Provide a valid Name!").required(
    "Name is required for an Item!"
  ),
});

export default function itemFormValidator(values) {
  validationSchema.validate(values);
}
