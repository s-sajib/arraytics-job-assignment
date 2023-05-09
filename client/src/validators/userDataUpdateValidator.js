import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string("Name Must be a String!").required("Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required to Login"),
});

export default function userDataUpdateaValidator(values) {
  validationSchema.validateSync(values);
}
