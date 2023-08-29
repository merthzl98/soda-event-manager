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
      primary: "#000000",
    },
  },
  typography: {
    fontFamily: "inherit",
    fontWeightRegular: "400",
    fontWeightMedium: "500",
    fontWeightBold: "600",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "&:hover": {
            transition: "0.5s",
            opacity: "0.8",
          },
        }),
      },
    },
  },
});

export default theme;
