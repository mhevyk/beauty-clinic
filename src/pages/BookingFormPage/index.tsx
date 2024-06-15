import { Box, Button, Divider, styled } from "@mui/material";
import theme from "@theme/theme.ts";
import { Link, useParams } from "react-router-dom";
import CaretLeft from "@icons/caret-left.svg";
import ClientDetails from "@pages/BookingFormPage/components/ClientDetails";
import { Formik } from "formik";
import { bookingFormSchema } from "@validation/bookingFormSchema.ts";
import OrderInformation from "@pages/BookingFormPage/components/OrderInformation";
import useCreateOrder from "@hooks/useCreateOrder.ts";
import AddToCartButton from "./components/AddToCartButton";
import CreateOrderButton from "./components/CreateOrderButton";
import useUnifiedOrderData from "@pages/BookingFormPage/hooks/useUnifiedOrderData.ts";

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  display: "flex",
  justifyContent: "center",
});

const ContainerStyled = styled(Box)({
  maxWidth: "1000px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

const BackButton = styled(Button)({
  textAlign: "left",
  marginBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

const ClientDetailsTitle = styled("h3")(({ theme }) => ({
  ...theme.typography.heading,
  fontSize: "20px",
  margin: "0 0 12px",
}));

const ClientDetailsBox = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 26px",
  [theme.breakpoints.up("md")]: {
    maxWidth: "608px",
  },
}));

const BookingDetailsBox = styled(Box)(({ theme }) => ({
  margin: "0 26px",
  [theme.breakpoints.down("md")]: {
    margin: "32px",
    width: "100%",
  },
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));

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
    <SectionStyled>
      <ContainerStyled>
        <BackButton
          component={Link}
          to={
            params.treatmentId ? `/book-session/${params.treatmentId}` : "/cart"
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
      </ContainerStyled>
    </SectionStyled>
  );
}
