import classnames from "classnames";
import AppButton from "design-system/app-button/AppButton";
import AppTypography from "design-system/app-typography/AppTypography";
import { useFormik } from "formik";

import { useGetCurrentUserDetailsQuery } from "@/api/generated";
import BookingForm from "@/containers/forms/booking-form/BookingForm";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import AddToCartButton from "@/pages/booking-form/components/add-to-cart-button/AddToCartButton";
import ClientDetails from "@/pages/booking-form/components/client-details/ClientDetails";
import "@/pages/booking-form/components/order-information-section/OrderInformationSection.scss";
import OrderInformation from "@/pages/booking-form/components/order-information/OrderInformation";
import useUnifiedOrderData from "@/pages/booking-form/hooks/use-unified-order-data/useUnifiedOrderData";
import { useUserStore } from "@/store/user/userStore.ts";
import { bookingFormSchema } from "@/validation/bookingFormSchema";

export default function OrderInformationSection() {
  const { itemsToOrder, cartState } = useUnifiedOrderData();
  const [createOrder, { isLoading: isOrderProcessing }] =
    useCreateOrder(itemsToOrder);

  const { data } = useGetCurrentUserDetailsQuery();
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  const userDetails = data?.getCurrentUserDetails;

  const initialFormValues: ClientDetailsFormValues = {
    name: isAuthenticated && userDetails ? userDetails.username : "",
    email: isAuthenticated && userDetails ? userDetails.email : "",
    phoneNumber: isAuthenticated ? (userDetails?.phoneNumber ?? "") : "",
    message: "",
  };

  const {
    values: formValues,
    errors,
    handleChange,
    setFieldValue,
    setValues,
    handleSubmit: submitForm,
  } = useFormik({
    initialValues: initialFormValues,
    onSubmit: handleSubmit,
    validationSchema: bookingFormSchema,
    validateOnMount: false,
    enableReinitialize: true,
  });

  async function handleSubmit(values: ClientDetailsFormValues) {
    await createOrder(values);
  }

  return (
    <form onSubmit={submitForm}>
      <div className={classnames("order-information", classnames)}>
        <div className="order-information__client-details">
          <AppTypography
            className="order-information__client-details__heading"
            variant="h6"
          >
            Client Details
          </AppTypography>
          <hr className="order-information__client-details__divider" />
          <ClientDetails />
          <BookingForm
            values={formValues}
            errors={errors}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            setValues={setValues}
          />
        </div>
        <div className="order-information__booking-details">
          <OrderInformation sessionsFromLocation={cartState?.sessions} />
          <AddToCartButton />
          <AppButton
            className="order-information__booking-details__submit-button"
            disabled={isOrderProcessing}
            isLoading={isOrderProcessing}
            type="submit"
            size="sm"
            width="full"
          >
            Book Now
          </AppButton>
        </div>
      </div>
    </form>
  );
}
