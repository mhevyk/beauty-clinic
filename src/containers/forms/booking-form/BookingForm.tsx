import { ChangeEvent, useEffect, useState } from "react";

import classNames from "classnames";
import { useFormikContext } from "formik";

import { useGetCurrentUserDetailsQuery } from "@/api/generated";
import { PHONE_NUMBER_PATTERN } from "@/constants";
import "@/containers/forms/booking-form/BookingForm.scss";
import { useUserStore } from "@/store/user/userStore.ts";
import AppTextInput from "@/styles/app-text-input/AppTextInput.tsx";
import AppTextarea from "@/styles/app-textarea/AppTextarea.tsx";

type BookingFormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};

export default function BookingForm() {
  const [length, setLength] = useState(0);
  const { values, handleChange, errors, setFieldValue, setValues } =
    useFormikContext<BookingFormValues>();

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
    <>
      <div className={classNames("form", classNames)}>
        <div className="form__box">
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
          fullWidth={true}
        />
        <AppTextarea
          label="Add Your Message"
          errorMessage={errors?.message}
          value={values.message}
          onChange={handleChange}
          name="message"
        />
      </div>
    </>
  );
}
