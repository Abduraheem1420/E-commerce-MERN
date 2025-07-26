import { createTheme, type ThemeOptions } from '@mui/material/styles';

// You can define your theme options with type safety using ThemeOptions
const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'Cairo',           // The name of the font family as defined by Fontsource
      'sans-serif',      // A generic fallback font
    ].join(','),
  },
};

const theme = createTheme(themeOptions);

export default theme;