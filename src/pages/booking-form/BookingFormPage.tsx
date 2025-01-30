import { Link, useParams } from "react-router-dom";

import CaretLeft from "@/assets/icons/caret-left.svg";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import {
  BackButton,
  BoxStyled,
  ContainerStyled,
  SectionStyled,
} from "@/pages/booking-form/BookingFormPage.styled";
import OrderInformationSection from "@/pages/booking-form/components/order-information-section/OrderInformationSection";

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function BookingFormPage() {
  const params = useParams<BookTreatmentSessionParams>();

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
            <OrderInformationSection />
          </BoxStyled>
        </ContainerStyled>
      </SectionStyled>
    </AppHelmet>
  );
}
