import { Link, useParams } from "react-router-dom";

import Divider from "@mui/material/Divider";
import { Formik } from "formik";

import CaretLeft from "@/assets/icons/caret-left.svg";

import AppHelmet from "@/components/app-helmet/AppHelmet.tsx";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder.ts";
import {
  BackButton,
  BookingDetailsBox,
  BoxStyled,
  ClientDetailsBox,
  ClientDetailsTitle,
  ContainerStyled,
  SectionStyled,
} from "@/pages/booking-form/BookingFormPage.styled.ts";
import ClientDetails from "@/pages/booking-form/components/client-details/ClientDetails.tsx";
import OrderInformation from "@/pages/booking-form/components/order-information/OrderInformation";
import useUnifiedOrderData from "@/pages/booking-form/hooks/use-unified-order-data/useUnifiedOrderData";
import { bookingFormSchema } from "@/validation/bookingFormSchema.ts";

import AddToCartButton from "./components/add-to-cart-button/AddToCartButton.tsx";
import CreateOrderButton from "./components/create-order-button/CreateOrderButton.tsx";

type BookTreatmentSessionParams = {
  treatmentId: string;
};

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

export default function BookingFormPage() {
  const params = useParams<BookTreatmentSessionParams>();
  const { itemsToOrder, cartState } = useUnifiedOrderData();
  const [createOrder, { isLoading: isOrderProcessing }] =
    useCreateOrder(itemsToOrder);

  async function handleSubmit(values: CreateOrderSubmitForm) {
    await createOrder(values);
  }

  return (
    <AppHelmet title="Book session" description="Confirm session order">
      <SectionStyled>
        <ContainerStyled>
          <BackButton
            component={Link}
            to={
              params.treatmentId
                ? `/book-session/${params.treatmentId}`
                : "/cart"
            }
            startIcon={<CaretLeft width={16} height={16} />}
          >
            Back
          </BackButton>
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
                  <OrderInformation
                    sessionsFromLocation={cartState?.sessions}
                  />
                  <AddToCartButton />
                  <CreateOrderButton isOrderProcessing={isOrderProcessing} />
                </BookingDetailsBox>
              </>
            </Formik>
          </BoxStyled>
        </ContainerStyled>
      </SectionStyled>
    </AppHelmet>
  );
}
