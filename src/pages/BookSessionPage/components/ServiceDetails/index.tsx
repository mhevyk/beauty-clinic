import { Suspense } from "react";

import { LinearProgress, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import CaretAnimatedIcon from "@/components/CaretAnimatedIcon.tsx";
import ErrorBoundary from "@/components/ErrorBoundary";
import useToggle from "@/hooks/useToggle.ts";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout";
import showSnackbar from "@/utils/showSnackbar";

import TreatmentDetails from "./components/TreatmentDetails";

const ANIMATION_DURATION_MS = 550;

const ButtonStyled = styled(Button)({
  padding: "12px 0",
  flexDirection: "column",
  alignItems: "baseline",
});

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
          <CaretAnimatedIcon
            hasToggle={isOpen}
            AnimationDuration={ANIMATION_DURATION_MS}
            rotateStartPosition="270deg"
            rotateEndPosition="90deg"
          />
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
          <Suspense
            fallback={
              <Box padding="25px">
                <LinearProgress color="secondary" />
              </Box>
            }
          >
            <TreatmentDetails hasAvailableSession={hasAvailableSession} />
          </Suspense>
        </ErrorBoundary>
      </Collapse>
    </>
  );
}
