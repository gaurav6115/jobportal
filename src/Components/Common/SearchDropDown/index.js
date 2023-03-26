import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import "./SearchDropdown.css";

function SearchDropdown({
  options,
  values,
  onChange,
  onDelete,
  required,
  disabled,
}) {
  return (
    <div>
      <Autocomplete
        disabled={disabled}
        required={required}
        disablePortal
        id="combo-box-demo"
        options={options || []}
        size="small"
        fullWidth
        renderInput={(params) => <TextField {...params} />}
        onChange={(event, value) => onChange(value)}
      />
      <div className="skillsConatiner">
        {values.map((value) => {
          return (
            <div
              style={{
                pointerEvents: disabled ? "none" : "auto",
                opacity: disabled ? 0.5 : 1,
              }}
              onClick={() => onDelete(value, "remove")}
              className="skills"
            >
              {value}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchDropdown;
