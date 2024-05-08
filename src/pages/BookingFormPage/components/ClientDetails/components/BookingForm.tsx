import FormGroupWithError from "@components/FormGroupWithError.tsx";
import { Box, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

export default function BookingForm() {
  const [nameLength, setNameLength] = useState(1);

  return (
    <form>
      <Box display="flex">
        <FormGroupWithError>
          <InputLabel>Name*</InputLabel>
          <TextField
            size="small"
            type="text"
            name="usernameOrEmail"
            fullWidth
          />
          {nameLength}
        </FormGroupWithError>
        <FormGroupWithError>
          <InputLabel>Email*</InputLabel>
          <TextField
            size="small"
            type="text"
            name="usernameOrEmail"
            fullWidth
          />
        </FormGroupWithError>
      </Box>
    </form>
  );
}
