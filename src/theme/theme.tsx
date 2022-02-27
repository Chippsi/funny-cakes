import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1328,
      xl: 1536,
    },
  },

  palette: {
    primary: {
      main: '#9575cd',
    },
    secondary: {
      main: '#616161',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: 'Ubuntu',
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '10px',
          paddingRight: '10px',
        },
      },
    },
  },
}

let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme, {
  factor: 3,
  breakpoints: ['sm'],
});

theme.typography.body1 = {
  fontSize: '0.85rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
};

theme.typography.body2 = {
  fontSize: '0.75rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
};

export { theme };
