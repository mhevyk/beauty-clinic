import { ChangeEvent, useState } from "react";

import classnames from "classnames";
import { FormikProps } from "formik";

import { PHONE_NUMBER_PATTERN } from "@/constants";
import "@/containers/forms/booking-form/BookingForm.scss";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import { useUserStore } from "@/store/user/userStore";
import AppTextInput from "@/styles/app-text-input/AppTextInput";
import AppTextarea from "@/styles/app-textarea/AppTextarea";

type BookingFormProps = Pick<
  FormikProps<ClientDetailsFormValues>,
  "values" | "handleChange" | "errors" | "setFieldValue" | "setValues"
>;

export default function BookingForm({
  values,
  handleChange,
  errors,
}: BookingFormProps) {
  const [length, setLength] = useState(values.name.length ?? 0);

  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newName.length <= 50) {
      handleChange(event);
      setLength(newName.length);
    }
  };

  return (
    <div className={classnames("form", classnames)}>
      <div className="form__row">
        <AppTextInput
          label="Name*"
          placeholder={values.name}
          errorMessage={errors?.name}
          disabled={isAuthenticated}
          onChange={handleNameChange}
          minWidth="296px"
          maxLength={50}
          helperText={`${length}/50`}
          name="name"
        />
        <AppTextInput
          label="Email*"
          placeholder={values.email}
          errorMessage={errors?.email}
          onChange={handleChange}
          disabled={isAuthenticated}
          minWidth="296px"
          name="email"
        />
      </div>
      <AppTextInput
        label="Phone number"
        errorMessage={errors?.phoneNumber}
        value={values.phoneNumber}
        onChange={handleChange}
        disabled={isAuthenticated}
        mask={PHONE_NUMBER_PATTERN}
        placeholder="(___) ___-____"
        name="phoneNumber"
        fullWidth
      />
      <AppTextarea
        label="Add Your Message"
        errorMessage={errors?.message}
        value={values.message}
        onChange={handleChange}
        name="message"
      />
    </div>
  );
}
