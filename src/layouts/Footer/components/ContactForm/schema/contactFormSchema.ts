import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .min(2, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters")
    .required("Message is required"),
});
