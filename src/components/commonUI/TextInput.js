import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: "0.25rem",
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light" ? "rgba(85, 85, 85, 0.1)" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: "0.75rem",
    width: "100%",
    padding: "0.5rem",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const TextInput = (props) => {
  const { name, onChange, value, label, minRows, placeholder } = props;

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel sx={{ fontWeight: "bold" }} shrink htmlFor={label}>
        {label}
      </InputLabel>
      <BootstrapInput
        name={name}
        onChange={onChange}
        value={value}
        id="text-input"
        label={label}
        variant="outlined"
        multiline={true}
        minRows={minRows ?? 1}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default TextInput;
