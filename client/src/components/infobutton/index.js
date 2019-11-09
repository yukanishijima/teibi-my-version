import React from 'react';
import API from "../../utils/API";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './style.css';

// set up default primary color
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005f56",
      secondary: "#00897b",
    },
    secondary: {
      main: '#ffe57f',
    },
  },
});

const useStyles = makeStyles({
  container: {
    height: "400px",
    background: "white",
  },
  menu: {
    borderRadius: "50%",
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 45,
    minWidth: 45,
    height: 45,
  },
  logoutContainer: {
    justifyContent: "center",
  },
  logout: {
    border: "1px solid rgb(18, 56, 6)",
    borderRadius: 50,
    width: "90%",
    background: "white",
    color: "rgb(18, 56, 6)",
  },
  titleContainer: {
    textAlign: "center",
  },
  signIn: {
    color: "rgb(18, 56, 6)",
  },
  signUp: {
    color: "rgb(18, 56, 6)",
  }
});


export default function InfoButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisplay = () => {
    // add code here
  };

  const handleLogOut = () => {
    API.checkLogin().then(res => {
      console.log(res.data.loggedIn);

      if (res.data.loggedIn) {
        API.logoutUser().then(res => {
          alert("You have successfully logged out.");
          window.location.replace("/");
        });
      } else {
        alert("You're not logged in.");
      };
    });
  };

  const classes = useStyles();

  let urlClean = window.location.pathname.split('/')[2]
  let finalUrlSignIn = "/signin/?" + urlClean;
  let finalUrlSignUp = "/signup/?" + urlClean;


  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" type="button" onClick={handleClickOpen} className={classes.menu}>
          <i class="fas fa-hand-point-right" style={{ fontSize: "1.8em" }}></i>
        </Button>
      </ThemeProvider>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.container}>

          <DialogTitle id="alert-dialog-title" className={classes.titleContainer}>
            <Button onClick={handleDisplay} className={classes.signIn}>Sign In</Button>
            <Button onClick={handleDisplay} className={classes.signUp}>Sign Up</Button>
          </DialogTitle>

          {/* <DialogContentText id="alert-dialog-description"> */}
          {/* <DialogActions> */}

          <iframe id="signIn" className="signIn" title="Sign In" frameBorder="0" src={finalUrlSignIn}>
          </iframe>

          {/* </DialogActions> */}
          {/* <DialogActions> */}

          <iframe id="signUp" className="signUp hide" title="Sign Up" frameBorder="0" src={finalUrlSignUp}>
          </iframe>

          {/* </DialogActions> */}

          <DialogActions className={classes.logoutContainer}>
            <Button variant="outlined" color="primary" onClick={handleLogOut} className={classes.logout}>Log Out</Button>
          </DialogActions>

          {/* </DialogContentText> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
