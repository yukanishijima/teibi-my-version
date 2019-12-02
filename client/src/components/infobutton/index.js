import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import TogglePanel from "./togglePanel";
import { myTheme } from "../../utils/myTheme";
import './style.css';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function InfoButton() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen} id="menu">
        <Tooltip title={"User"} placement="top">
          {/* <i className="fas fa-door-open" style={{ color: myTheme.palette.secondary.secondary }}></i> */}
          <i className="far fa-user info-user" style={{ color: myTheme.palette.secondary.secondary }}></i>
        </Tooltip>
      </Fab>

      <Dialog open={open} onClose={handleClose} className="dialog">
        <TogglePanel />
      </Dialog>
    </>
  );
}
