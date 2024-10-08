import { Suspense } from "react";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/material/styles";

import caretIcon from "@/assets/icons/caret-left.svg";

import ErrorBoundary from "@/components/error-boundary/ErrorBoundary.tsx";
import useToggle from "@/hooks/use-toggle/useToggle.ts";
import ErrorAlertLayout from "@/layouts/error-layout/ErrorLayout.tsx";
import TreatmentDetails from "@/pages/book-session/components/treatment-details/TreatmentDetails";
import showSnackbar from "@/utils/show-snackbar/showSnackbar.ts";

const ANIMATION_DURATION_MS = 550;

const ButtonStyled = styled(Button)({
  padding: "12px 0",
  flexDirection: "column",
  alignItems: "baseline",
});

type CaretIconProps = {
  pointsToRight: boolean;
};

//TODO: make this animation global
const IconStyled = styled(caretIcon, {
  shouldForwardProp: prop => prop !== "pointsToRight",
})<CaretIconProps>(({ pointsToRight, theme }) => ({
  stroke: theme.palette.secondary.main,
  animation: `${pointsToRight ? rotateForward : rotateBackward} ${ANIMATION_DURATION_MS}ms forwards`,
}));

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

const rotateForward = keyframes`
  from {
    transform: rotate(270deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

const rotateBackward = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(270deg);
  }
`;
