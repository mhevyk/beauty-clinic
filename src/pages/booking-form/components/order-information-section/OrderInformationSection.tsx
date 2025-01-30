import Divider from "@mui/material/Divider";
import { useFormik } from "formik";

import BookingForm from "@/containers/forms/booking-form/BookingForm";
import { ClientDetailsFormValues } from "@/containers/forms/booking-form/BookingForm.types";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import {
  BookingDetailsBox,
  BoxStyled,
  ClientDetailsBox,
  ClientDetailsTitle,
} from "@/pages/booking-form/BookingFormPage.styled";
import AddToCartButton from "@/pages/booking-form/components/add-to-cart-button/AddToCartButton";
import ClientDetails from "@/pages/booking-form/components/client-details/ClientDetails";
import CreateOrderButton from "@/pages/booking-form/components/create-order-button/CreateOrderButton";
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
      <BoxStyled>
        <ClientDetailsBox>
          <ClientDetailsTitle>Client Details</ClientDetailsTitle>
          <Divider color="black" />
          <ClientDetails />
          <BookingForm formik={formik} />
        </ClientDetailsBox>
        <BookingDetailsBox>
          <OrderInformation sessionsFromLocation={cartState?.sessions} />
          <AddToCartButton />
          <CreateOrderButton
            type="submit"
            isOrderProcessing={isOrderProcessing}
          />
        </BookingDetailsBox>
      </BoxStyled>
    </form>
  );
}
