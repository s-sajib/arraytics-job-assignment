import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required to Login"),
  password: Yup.string().required("Password is required to login"),
});

export default function loginFormValidator(values) {
  validationSchema.validate(values);
}
