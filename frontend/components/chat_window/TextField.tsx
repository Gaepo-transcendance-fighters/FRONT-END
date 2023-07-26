import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";

export default function UseFormControl() {
  const [msg, setMsg] = useState<string>("");

  const changeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl>
        <OutlinedInput
          className="input_field"
          onChange={changeMsg}
          placeholder="Please enter message"
        />
      </FormControl>
    </Box>
  );
}
