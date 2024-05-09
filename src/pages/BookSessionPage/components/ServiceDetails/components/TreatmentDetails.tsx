import { useGetTreatmentByIdSuspenseQuery } from "@api/hooks";
import { Box, Typography } from "@mui/material";
import minutesToHourAndMinutes from "@utils/minutesToHourAndMinutes";
import { format } from "date-fns";
import EmployeeSelect from "./EmployeeSelect";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider";

type TreatmentDetailsProps = {
  hasAvailableSession: boolean;
};

export default function TreatmentDetails({
  hasAvailableSession,
}: TreatmentDetailsProps) {
  const { selectedTime, treatmentId } = useDatetimePickerContext();

  const { data } = useGetTreatmentByIdSuspenseQuery({
    variables: { treatmentId: treatmentId },
  });

  const treatment = data.treatment;

  return (
    <Box paddingBottom="12px">
      <Typography fontSize="16px">{treatment.name}</Typography>
      <EmployeeSelect />
      {hasAvailableSession && (
        <>
          <Typography fontSize="16px">
            {format(selectedTime!, `MMMM d, yyyy h:mm aaa `)}
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
  );
}
