import { useId } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDatetimePickerContext } from "@/pages/book-session/context/DatetimePickerProvider.tsx";

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
        onChange={event => setSelectedEmployeeId(Number(event.target.value))}
      >
        {qualifiedEmployees.map(option => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
