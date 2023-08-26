import { Autocomplete, TextField } from "@mui/material";

import "./AutoComplete.scss";

const AutoComplete = (props) => {
  const {
    value,
    setValue,
    inputValue,
    setInputValue,
    options,
    handleOption,
    width,
    label,
  } = props;

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      getOptionLabel={handleOption}
      sx={{ width: width }}
      renderInput={(params) => (
        <TextField
          className="auto-complete"
          variant="standard"
          {...params}
          label={label}
        />
      )}
    />
  );
};

export default AutoComplete;
