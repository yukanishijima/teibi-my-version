import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


function SignIn({ url }) {
  let urlClean = url.split('/')[2]
  let finalUrl = "/signin/?" + urlClean;

  const [setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Link to={finalUrl}>
      <Button onClick={handleClose} color="primary" autoFocus>
        Sign in
      </Button>
    </Link>
  )
}

export default SignIn;