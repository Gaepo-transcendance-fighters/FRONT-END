"use client";

import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { useState, ChangeEvent } from "react";

export default function UseFormControl() {
  const [msg, setMsg] = useState<string>("");

  const changeMsg = (event: ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl>
        <OutlinedInput
          style={{
            backgroundColor: "#1e4ca9",
            height: "5%",
            width: "45vw",
            margin: "8px",
            color: "white",
            marginTop: "2%",
          }}
          onChange={changeMsg}
          placeholder="Please enter message"
        />
      </FormControl>
    </Box>
  );
}
