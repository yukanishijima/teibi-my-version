import React from 'react';
import { useCopyToClipboard } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import "react-toastify/dist/ReactToastify.css";
import './style.css';
//import {  positions } from '@material-ui/system';


const CopyLink = (props) => {
    const [ setText] = React.useState('');
    // eslint-disable-next-line
    const [state, copyToClipboard] = useCopyToClipboard();
    // console.log(props);
    
    function notify (){ 
      toast.warn("Your Link is copied. Share it!",{
        position: "bottom-center",
        autoClose: 2000,
        pauseOnFocusLoss: false
      },
      )
    };
    return (
      <div>
        <input type="hidden" value={props.text} onChange={e => setText(e.target.value)} />
        <ToastContainer />
        <Button id="copyButton" variant="contained" color="primary" type="button" onClick={() => {copyToClipboard(props.text); notify()}}><i className="fas fa-copy"> share Link</i></Button>
      </div>
    )
  }
  export default CopyLink;