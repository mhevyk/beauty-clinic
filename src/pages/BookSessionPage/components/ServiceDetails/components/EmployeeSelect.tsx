import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDatetimePickerContext } from "@pages/BookSessionPage/context/DatetimePickerProvider";
import { useId } from "react";

// TODO: change UI of select
export default function EmployeeSelect() {
  const { selectedEmployeeId, setSelectedEmployeeId, qualifiedEmployees } =
    useDatetimePickerContext();
  const id = useId();

  return (
    <FormControl variant="filled" size="small" fullWidth>
      <InputLabel id={`${id}-select-label`}>Employee</InputLabel>
      <Select
        labelId={`${id}-select-label`}
        value={selectedEmployeeId?.toString()}
        onChange={(event) => setSelectedEmployeeId(Number(event.target.value))}
      >
        {qualifiedEmployees.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
