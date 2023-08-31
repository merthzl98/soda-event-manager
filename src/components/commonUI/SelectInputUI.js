import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
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

const SelectInputUI = (props) => {
  const { data, width, label, value, setValue } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="standard">
      <InputLabel sx={{ fontWeight: "bold" }} shrink htmlFor={label}>
        {label}
      </InputLabel>
      <Select
        sx={{ width: width }}
        value={value}
        onChange={handleChange}
        input={<BootstrapInput />}
      >
        {data.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInputUI;
