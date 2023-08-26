import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";

const DatePicker = (props) => {
  const { label, time, setTime, width } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DateTimePicker
        label={label}
        value={time}
        onChange={(newValue) => setTime(newValue)}
        renderInput={(props) => <TextField sx={{ width: width }} {...props} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
