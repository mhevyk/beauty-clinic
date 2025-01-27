import Divider from "@mui/material/Divider";
import { Formik } from "formik";

import useCreateOrder from "@/hooks/use-create-order/useCreateOrder.ts";
import {
  BookingDetailsBox,
  BoxStyled,
  ClientDetailsBox,
  ClientDetailsTitle,
} from "@/pages/booking-form/BookingFormPage.styled.ts";
import AddToCartButton from "@/pages/booking-form/components/add-to-cart-button/AddToCartButton.tsx";
import ClientDetails from "@/pages/booking-form/components/client-details/ClientDetails.tsx";
import CreateOrderButton from "@/pages/booking-form/components/create-order-button/CreateOrderButton.tsx";
import OrderInformation from "@/pages/booking-form/components/order-information/OrderInformation.tsx";
import useUnifiedOrderData from "@/pages/booking-form/hooks/use-unified-order-data/useUnifiedOrderData.ts";
import { bookingFormSchema } from "@/validation/bookingFormSchema.ts";

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
