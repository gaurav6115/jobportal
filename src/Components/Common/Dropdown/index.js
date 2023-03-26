import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = ({options, onChange, value, required, disabled}) => {
  return (
    <FormControl fullWidth>
      <Select
      disabled={disabled}
      required={required}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        size="small"
        onChange={(e) => onChange(e.target.value)}
      >
        {
        options.map((option) => {
          return <MenuItem value={option}>{option}</MenuItem>;
        })
        }
      </Select>
    </FormControl>
  );
};

export default Dropdown;
