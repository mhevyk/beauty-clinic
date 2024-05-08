import { Box, Button, Divider, styled, Typography } from "@mui/material";
import theme from "@theme/theme.ts";
import { Link, useParams } from "react-router-dom";
import CaretLeft from "@icons/caret-left.svg?react";
import BookingDetails from "@pages/BookingFormPage/components/BookingDetails.tsx";
import { Treatment } from "@api/hooks";
import { useOrderStore } from "@store/order/orderStore.ts";
import ClientDetails from "@pages/BookingFormPage/components/ClientDetails";

const data: Treatment = {
  __typename: "Treatment",
  pricePerUnit: 200,
  id: "1",
  duration: 90,
  name: "Signature Facial",
};

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.CreamyDawn.main,
  display: "flex",
  justifyContent: "center",
});

const ContainerStyled = styled(Box)({
  maxWidth: "980px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

const ButtonStyled = styled(Button)({
  textAlign: "left",
  marginBottom: "42px",
  fontWeight: 330,
}) as typeof Button;

const ButtonGroup = styled(Button)({
  marginTop: "12px",
});

const ClientDetailsTitle = styled("h3")(({ theme }) => ({
  ...theme.typography.heading,
  fontSize: "20px",
  margin: "0 0 12px",
}));

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function BookingFormPage() {
  const params = useParams<BookTreatmentSessionParams>();
  const treatmentId = Number(params.treatmentId);

  // const { data } = useGetTreatmentByIdSuspenseQuery({
  //   variables: { treatmentId },
  // });

  const selectedDate = useOrderStore((store) => store.treatmentSessionDatetime);

  return (
    <SectionStyled>
      <ContainerStyled>
        <ButtonStyled
          component={Link}
          to={`/book-session/${treatmentId}`}
          startIcon={<CaretLeft width={16} height={16} />}
        >
          Back
        </ButtonStyled>
        <Box display="flex" flexWrap="wrap">
          <Box width="608px" marginRight="26px" border="red solid 1px">
            <ClientDetailsTitle>Client Details</ClientDetailsTitle>
            <Divider color="black" />
            <ClientDetails />
          </Box>
          <Box width="280px" marginLeft="26px">
            <BookingDetails treatment={data} date={selectedDate} />
            <Typography margin="20px 0 12px">Payment Details</Typography>
            <Box
              marginBottom="20px"
              display="flex"
              justifyContent="space-between"
            >
              <Typography>Total</Typography>
              <Typography>${data.pricePerUnit}</Typography>
            </Box>
            <ButtonGroup fullWidth size="small" variant="primary-outlined">
              Add to Cart
            </ButtonGroup>
            <ButtonGroup fullWidth size="small" variant="primary">
              Book Now
            </ButtonGroup>
          </Box>
        </Box>
      </ContainerStyled>
    </SectionStyled>
  );
}
