import React from "react";

import TextField from "@mui/material/TextField";
import { parseRangeInputValue } from "@mui/lab/internal/pickers/date-utils";

const InputComponent = ({ inputRef, ...other }) => <div {...other} />;
const OutlinedDiv = ({ children, label }) => 

    <TextField
      variant="outlined"
      label={label}
      multiline
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent,
        inputProps: {children}
      }}
    //   inputProps={{ children: children }}
    />
  
export default OutlinedDiv;