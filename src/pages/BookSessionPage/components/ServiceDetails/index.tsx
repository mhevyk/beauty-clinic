import {
  Box,
  Button,
  Collapse,
  IconButton,
  keyframes,
  styled,
} from "@mui/material";
import caretIcon from "@icons/caret-left.svg?react";
import useToggle from "@hooks/useToggle.ts";
import TreatmentDetails from "./components/TreatmentDetails";
import { Suspense } from "react";
import ErrorBoundary from "@components/ErrorBoundary";
import showSnackbar from "@utils/showSnackbar";
import ErrorAlertLayout from "@layouts/ErrorLayout.tsx";

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
  shouldForwardProp: (prop) => prop !== "pointsToRight",
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
          fallback={(error) => (
            <ErrorAlertLayout errorMessage={error?.message} size="small" />
          )}
          onError={(error) =>
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
