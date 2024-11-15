import { Suspense } from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import ErrorBoundary from "@/components/error-boundary/ErrorBoundary.tsx";
import useToggle from "@/hooks/use-toggle/useToggle.ts";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout.tsx";
import {
  ButtonStyled,
  IconStyled,
} from "@/pages/book-session/components/service-details/ServiceDetails.styled";
import TreatmentDetails from "@/pages/book-session/components/treatment-details/TreatmentDetails";
import showSnackbar from "@/utils/show-snackbar/showSnackbar.ts";

type ServiceDetailsProps = {
  hasAvailableSession: boolean;
};

export default function ServiceDetails({
  hasAvailableSession,
}: ServiceDetailsProps) {
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <Box alignItems="center" display="flex" onClick={toggle}>
        <ButtonStyled fullWidth>Service Details</ButtonStyled>
        <IconButton>
          <IconStyled pointsToRight={isOpen} />
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        <ErrorBoundary
          fallback={error => (
            <ErrorAlertLayout errorMessage={error?.message} size="small" />
          )}
          onError={error =>
            showSnackbar({
              message: error.message,
              autohide: true,
            })
          }
        >
          {/* TODO: change fallback */}
          <Suspense fallback={<div>Loading...</div>}>
            <TreatmentDetails hasAvailableSession={hasAvailableSession} />
          </Suspense>
        </ErrorBoundary>
      </Collapse>
    </>
  );
}
