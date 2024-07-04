import { useFormik } from "formik";
import { contactFormSchema } from "@/validation/contactFormSchema";

type ContactFormFields = {
  name: string;
  email: string;
  message: string;
};

type OnSubmit = (values: ContactFormFields) => void;

export function useContactFormValues(onSubmit: OnSubmit) {
  return useFormik<ContactFormFields>({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: contactFormSchema,
    onSubmit,
  });
}
