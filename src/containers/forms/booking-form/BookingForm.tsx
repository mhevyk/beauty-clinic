import { ChangeEvent, useEffect, useState } from "react";

import classnames from "classnames";

import { useGetCurrentUserDetailsQuery } from "@/api/generated";
import { PHONE_NUMBER_PATTERN } from "@/constants";
import "@/containers/forms/booking-form/BookingForm.scss";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import { useUserStore } from "@/store/user/userStore";
import AppTextInput from "@/styles/app-text-input/AppTextInput";
import AppTextarea from "@/styles/app-textarea/AppTextarea";

type BookingFormProps = {
  values: ClientDetailsFormValues;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: Partial<Record<keyof ClientDetailsFormValues, string>>;
  setFieldValue: (field: string, value: unknown) => void;
  setValues: (values: ClientDetailsFormValues) => void;
};

export default function BookingForm({
  values,
  handleChange,
  errors,
  setFieldValue,
  setValues,
}: BookingFormProps) {
  const [length, setLength] = useState(0);

  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  const { data } = useGetCurrentUserDetailsQuery();

  useEffect(() => {
    const userDetails = data?.getCurrentUserDetails;

    if (userDetails && isAuthenticated) {
      setLength(userDetails.username.length);

      setFieldValue("name", userDetails.username ?? "");
      setFieldValue("email", userDetails.email ?? "");
      setFieldValue("phoneNumber", userDetails.phoneNumber ?? "");
    } else {
      setValues({
        name: "",
        email: "",
        phoneNumber: "",
        message: values.message,
      });
    }
  }, [isAuthenticated, data]);

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
