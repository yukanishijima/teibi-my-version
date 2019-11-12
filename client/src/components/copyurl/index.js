import React from 'react';
import { useCopyToClipboard } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
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
  return (
    <div>
      <input type="hidden" value={props.text} onChange={e => setText(e.target.value)} />
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Button id="copyButton" variant="contained" color="primary" type="button" onClick={() => { copyToClipboard(props.text); notify() }}>
          <i className="fas fa-copy"></i>
        </Button>
      </ThemeProvider>
    </div>
  )
}
export default CopyLink;