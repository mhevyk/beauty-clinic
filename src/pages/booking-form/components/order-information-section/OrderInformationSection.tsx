import Divider from "@mui/material/Divider";
import { Formik } from "formik";

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

export type CreateOrderSubmitForm = {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
};

const initialFormValues: CreateOrderSubmitForm = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
};

export default function OrderInformationSection() {
  const { itemsToOrder, cartState } = useUnifiedOrderData();
  const [createOrder, { isLoading: isOrderProcessing }] =
    useCreateOrder(itemsToOrder);

  async function handleSubmit(values: CreateOrderSubmitForm) {
    await createOrder(values);
  }

  return (
    <>
      <BoxStyled>
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
          validationSchema={bookingFormSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {/* formik requires the single child to work correctly */}
          <>
            <ClientDetailsBox>
              <ClientDetailsTitle>Client Details</ClientDetailsTitle>
              <Divider color="black" />
              <ClientDetails />
            </ClientDetailsBox>
            <BookingDetailsBox>
              <OrderInformation sessionsFromLocation={cartState?.sessions} />
              <AddToCartButton />
              <CreateOrderButton isOrderProcessing={isOrderProcessing} />
            </BookingDetailsBox>
          </>
        </Formik>
      </BoxStyled>
    </>
  );
}
