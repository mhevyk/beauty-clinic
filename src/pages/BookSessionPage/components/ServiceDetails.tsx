import {
  Box,
  Button,
  Collapse,
  IconButton,
  keyframes,
  styled,
  Typography,
} from "@mui/material";
import minutesToHourAndMinutes from "@utils/minutesToHourAndMinutes.ts";
import caretIcon from "@icons/caret-left.svg?react";
import { Treatment } from "@api/hooks";
import useToggle from "@hooks/useToggle.ts";
import { format } from "date-fns";

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
  treatment: Treatment;
  hasAvailableSession: boolean;
  date: Date;
};

export default function ServiceDetails({
  treatment,
  hasAvailableSession,
  date,
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
        <Box paddingBottom="12px">
          <Typography fontSize="16px">{treatment.name}</Typography>
          {hasAvailableSession && (
            <>
              <Typography fontSize="16px">
                {format(date, `MMMM d, yyyy h:mm aaa `)}
              </Typography>
              <Typography color="#605f5d" fontSize="14px">
                {/*TODO: add employee to response from server*/}
                {/*{details?.employee}*/}
                Roma Linuxist
              </Typography>
              <Typography color="#605f5d" fontSize="14px">
                {minutesToHourAndMinutes(treatment.duration)}
              </Typography>
            </>
          )}
          <Typography color="#605f5d" fontSize="14px">
            $ {treatment.pricePerUnit}
          </Typography>
        </Box>
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
