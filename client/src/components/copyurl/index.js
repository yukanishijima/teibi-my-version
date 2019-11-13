import React from 'react';
import { useCopyToClipboard } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import { myTheme } from "../../utils/myTheme";
import './style.css';


const CopyLink = (props) => {
  const [setText] = React.useState('');
  // eslint-disable-next-line
  const [state, copyToClipboard] = useCopyToClipboard();

  function notify() {
    toast.info("Your Link is copied. Share it!", {
      position: "bottom-right",
      autoClose: 2000,
      pauseOnFocusLoss: true
    },
    )
  };

  const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();


  return (
    <div>
      <input type="hidden" value={props.text} onChange={e => setText(e.target.value)} />
      <ToastContainer />

      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => { copyToClipboard(props.text); notify() }} id="copyButton">
        <Tooltip title={"Copy Url"} placement="top">
          <i className="fas fa-copy" style={{ color: myTheme.palette.secondary.secondary }}></i>
        </Tooltip>
      </Fab>
    </div>
  )
}
export default CopyLink;