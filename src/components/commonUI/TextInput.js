import React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderRadius: 5,
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light" ? "rgba(85, 85, 85, 0.1)" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 14,
    width: "100%",
    padding: "8px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const TextInput = (props) => {
  return (
    <FormControl variant="standard">
      <InputLabel
        sx={{ fontWeight: "bolder", color: "rgba(0, 0, 0, 0.8)", fontSize: "16px" }}
        shrink
        htmlFor={props.label}
      >
        {props.label}
      </InputLabel>
      <BootstrapInput
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        id="text-input"
        label={props.label}
        variant="outlined"
        multiline={true}
        minRows={props.minRows ? props.minRows : 1}
      />
    </FormControl>
  );
};

export default TextInput;
