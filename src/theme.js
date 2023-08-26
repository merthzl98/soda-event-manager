import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#0f051d",
    },
    secondary: {
      main: "rgba(1 ,1 ,1 ,0.5)",
    },
    error: {
      main: red.A400,
    },

    text: {
      primary: "#0f051d",
    },
  },
  typography: { fontFamily: "inherit" },
});

export default theme;
