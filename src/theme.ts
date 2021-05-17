import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#999999',
      dark: '#799cff',
      light: '#ff9fc9',
    },
    secondary: {
      main: '#ff707e',
      dark: '#7500fc',
    },
    text: {
        primary: '#000000',
        secondary: '#999999',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;