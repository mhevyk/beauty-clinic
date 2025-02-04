import Divider from "@mui/material/Divider";
import classnames from "classnames";
import AppButton from "design-system/app-button/AppButton";
import AppTypography from "design-system/app-typography/AppTypography";
import { useFormik } from "formik";

import BookingForm from "@/containers/forms/booking-form/BookingForm";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import AddToCartButton from "@/pages/booking-form/components/add-to-cart-button/AddToCartButton";
import ClientDetails from "@/pages/booking-form/components/client-details/ClientDetails";
import "@/pages/booking-form/components/order-information-section/OrderInformationSection.scss";
import OrderInformation from "@/pages/booking-form/components/order-information/OrderInformation";
import useUnifiedOrderData from "@/pages/booking-form/hooks/use-unified-order-data/useUnifiedOrderData";
import { bookingFormSchema } from "@/validation/bookingFormSchema";

const initialFormValues: ClientDetailsFormValues = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export default function OrderInformationSection() {
  const { itemsToOrder, cartState } = useUnifiedOrderData();
  const [createOrder, { isLoading: isOrderProcessing }] =
    useCreateOrder(itemsToOrder);

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: handleSubmit,
    validationSchema: bookingFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
  });

  async function handleSubmit(values: ClientDetailsFormValues) {
    await createOrder(values);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classnames("order-information", classnames)}>
        <div className="order-information__client-details">
          <AppTypography
            className="order-information__client-details__heading"
            variant="h6"
          >
            Client Details
          </AppTypography>
          <Divider color="black" />
          <ClientDetails />
          <BookingForm
            values={formik.values}
            errors={formik.errors}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
            setValues={formik.setValues}
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
