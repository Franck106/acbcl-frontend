import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#789fff",
      dark: "#799cff",
      light: "#f7f69b",
    },
    secondary: {
      main: "#ff707e",
      dark: "#7500fc",
    },
    text: {
      primary: "#666666",
      secondary: "#FFFFF",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
