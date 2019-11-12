import React from 'react';
import { useCopyToClipboard } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { myTheme } from "../../utils/myTheme";
import './style.css';


const CopyLink = (props) => {
  const [setText] = React.useState('');
  // eslint-disable-next-line
  const [state, copyToClipboard] = useCopyToClipboard();
  // console.log(props);

  function notify() {
    toast.warn("Your Link is copied. Share it!", {
      position: "bottom-center",
      autoClose: 2000,
      pauseOnFocusLoss: false
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
        <i className="fas fa-copy" style={{ color: myTheme.palette.secondary.secondary }}></i>
      </Fab>
    </div>
  )
}
export default CopyLink;