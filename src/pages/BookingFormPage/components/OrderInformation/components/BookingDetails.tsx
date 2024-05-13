import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  keyframes,
  styled,
  Typography,
} from "@mui/material";
import { Employee, Treatment } from "@api/hooks";
import caretIcon from "@icons/caret-left.svg?react";
import useToggle from "@hooks/useToggle.ts";
import { format } from "date-fns";
import minutesToHourAndMinutes from "@utils/minutesToHourAndMinutes.ts";

const ANIMATION_DURATION_MS = 550;

const ButtonStyled = styled(Button)({
  padding: "7px 0",
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
  employee: Employee;
  treatments: Treatment[];
  date: Date;
};

export default function BookingDetails({
  employee,
  treatments,
  date,
}: ServiceDetailsProps) {
  const { isOpen, toggle } = useToggle();

  return (
    <>
      <Box alignItems="center" display="flex" onClick={toggle}>
        <ButtonStyled fullWidth>Booking Details</ButtonStyled>
        <IconButton>
          <IconStyled pointsToRight={isOpen} />
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        {treatments.map((treatment) => (
          <Box key={treatment.id} height="116px" paddingBottom="12px">
            <Typography fontSize="16px">{treatment.name}</Typography>
            <Typography fontSize="16px">
              {format(date, `MMMM d, yyyy h:mm aaa `)}
            </Typography>
            <Typography color="#605f5d" fontSize="14px">
              {employee.name}
            </Typography>
            <Typography color="#605f5d" fontSize="14px">
              {minutesToHourAndMinutes(treatment.duration)}
            </Typography>
          </Box>
        ))}
      </Collapse>
      <Divider color="black" />
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
