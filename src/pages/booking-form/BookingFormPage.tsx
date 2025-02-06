import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";

import classnames from "classnames";
import AppTypography from "design-system//app-typography/AppTypography";
import AppLink from "design-system/app-link/app-link";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import "@/pages/booking-form/BookingFormPage.scss";
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
          <AppLink
            className="booking-page__section__link"
            to={
              params.treatmentId
                ? `/book-session/${params.treatmentId}`
                : "/cart"
            }
          >
            <span className="booking-page__section__link__box">
              <Icon
                icon="ph:caret-left"
                className="booking-page__section__link__icon"
              />
              <AppTypography>Back</AppTypography>
            </span>
          </AppLink>
          <OrderInformationSection />
        </div>
      </div>
    </AppHelmet>
  );
}
