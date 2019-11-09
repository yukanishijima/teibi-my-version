import React from 'react';
// import SignIn from "../sign/in";
// import SignUp from "../sign/up";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './style.css';


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
  }

  let urlClean = window.location.pathname.split('/')[2]
  let finalUrlSignIn = "/signin/?" + urlClean;
  let finalUrlSignUp = "/signup/?" + urlClean;


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Menu
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Button onClick={handleDisplay}>Sign In</Button>
          <Button onClick={handleDisplay}>Sign Up</Button>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {/* <DialogActions> */}

            <iframe id="signIn" className="signIn" title="Sign In" frameBorder="0" src={finalUrlSignIn}>
            </iframe>
            {/* </DialogActions> */}
            {/* <DialogActions> */}
            <iframe id="signUp" className="signUp hide" title="Sign Up" frameBorder="0" src={finalUrlSignUp}>
            </iframe>
            {/* </DialogActions> */}

          </DialogContentText>
        </DialogContent>

      </Dialog>
    </div >
  );
}
