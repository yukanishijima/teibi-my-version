import { createMuiTheme } from '@material-ui/core/styles';

const primary = "#005f56";  //dark green
const primaryLight = "#d5ded4";   //light green
const primaryGrey = "#819284";  //grey green 
// const secondary = "#e4df12";  //yellow
const secondary = "#efec80";   //yellow
const secondaryLight = '#efeed3';   //light yellow
// const secondaryGrey = "#ababa0"; //grey yellow

// set up default primary color
export const myTheme = createMuiTheme({

  palette: {
    primary: {
      main: primary,
      secondary: primaryLight,
      grey: primaryGrey,
    },
    secondary: {
      main: secondary,
      secondary: secondaryLight,
    },
    buttonOne: {
      background: primary,
      color: primaryLight,
      borderRadius: 50,
    },
    buttonTwo: {
      background: "transparent",
      color: primary,
      borderRadius: 50,
    },
    buttonThree: {
      background: primaryGrey,
      color: primaryLight,
      borderRadius: 50,
    },
    input: {
      borderBottom: "1px solid " + primary,
      background: "transparent",
    },
  },
});