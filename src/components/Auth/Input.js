import React from "react";
import { TextField, Grid } from "@material-ui/core";

//handle input fields
const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
      />
    </Grid>
  );
};

export default Input;
