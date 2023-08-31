import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, TextField, Typography } from "@mui/material";

import "./DatePicker.scss";

const DatePicker = (props) => {
  const { label, time, setTime, width } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
        <DateTimePicker
          className="date-picker"
          value={time}
          onChange={(newValue) => setTime(newValue)}
          renderInput={(props) => (
            <TextField
              sx={{
                width: width,
              }}
              {...props}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DatePicker;
