import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import TogglePanel from "../components/help";
// import { myTheme } from "../utils/myTheme";
import '../components/infobutton/style.css';


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function Help() {

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
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleClickOpen} id="help">
        <Tooltip title={"User"} placement="top">
        <img id="helpIcon" src="/images/Logo2.png" alt="logo"/>
        </Tooltip>
      </Fab>

      <Dialog open={open} onClose={handleClose} className="dialog">
        <TogglePanel />
      </Dialog>
    </>
  );
}
