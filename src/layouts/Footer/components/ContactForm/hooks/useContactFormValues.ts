import { useFormik } from "formik";
import contactFormSchema from "../schema/contactFormSchema";

type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

export function useContactFormValues() {
  return useFormik<ContactFormFields>({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    // TODO: connect to backend
    onSubmit: (values) => {
      console.log(values);
    },
  });
}
