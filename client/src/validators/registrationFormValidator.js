import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string("Name Must be a String!").required("Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required to Login"),
  password: Yup.string().required("Password is required to register"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function registrationFormValidator(values) {
  validationSchema.validateSync(values);
}
