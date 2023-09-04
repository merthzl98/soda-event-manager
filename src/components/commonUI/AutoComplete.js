import { Autocomplete, Box, TextField, Typography } from "@mui/material";

import "./AutoComplete.scss";

const AutoComplete = (props) => {
  const {
    value,
    setValue,
    inputValue,
    setInputValue,
    options,
    handleOption,
    label,
    isDisabled,
  } = props;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontSize: "0.75rem !important",
          paddingBottom: "4px",
          color: "rgba(0, 0, 0, 0.6)",
          fontWeight: "bold",
        }}
      >
        {label}
      </Typography>
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
        renderInput={(params) => (
          <TextField className="auto-complete" variant="standard" {...params} />
        )}
        disabled={isDisabled}
      />
    </Box>
  );
};

export default AutoComplete;
