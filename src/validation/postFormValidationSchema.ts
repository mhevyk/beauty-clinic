import * as Yup from "yup";

const postFormValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

export default postFormValidationSchema;
