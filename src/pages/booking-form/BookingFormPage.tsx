import { Link, useParams } from "react-router-dom";

import classnames from "classnames";

import CaretLeft from "@/assets/icons/caret-left.svg";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import "@/pages/booking-form/BookingFormPage.scss";
import { BackButton } from "@/pages/booking-form/BookingFormPage.styled";
import OrderInformationSection from "@/pages/booking-form/components/order-information-section/OrderInformationSection";

type BookTreatmentSessionParams = {
  treatmentId: string;
};

export default function BookingFormPage() {
  const params = useParams<BookTreatmentSessionParams>();

  return (
    <AppHelmet title="Book session" description="Confirm session order">
      <div className={classnames("booking-page", classnames)}>
        <div className="booking-page__section">
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
          <OrderInformationSection />
        </div>
      </div>
    </AppHelmet>
  );
}
