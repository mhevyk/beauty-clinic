import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";

import { useGetTreatmentByIdSuspenseQuery } from "@/api/generated";
import EmployeeSelect from "@/pages/book-session/components/employee-select/EmployeeSelect";
import { useDatetimePickerContext } from "@/pages/book-session/context/datetime-picker-context/DatetimePickerProvider";
import minutesToHourAndMinutes from "@/utils/minutes-to-hour-and-minutes/minutesToHourAndMinutes";

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
