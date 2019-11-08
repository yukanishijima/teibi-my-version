import React from 'react';
import { useCopyToClipboard } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import Button from '@material-ui/core/Button';
import "react-toastify/dist/ReactToastify.css";
import './style.css';
//import {  positions } from '@material-ui/system';


const CopyLink = (props) => {
    const [ setText] = React.useState('');
    const [copyToClipboard] = useCopyToClipboard();
    // console.log(props);
    function notify (){ 
      toast.warn("Your Link is copied. Share it!",{
        position: "bottom-center",
        autoClose: 2000
      },
      )
    };
    return (
      <div>
        <input type="hidden" value={props.text} onChange={e => setText(e.target.value)} />
        <ToastContainer />
        <Button id="copyButton" position="bottom" variant="contained" color="primary" type="button" onClick={() => {copyToClipboard(props.text); notify()}}><i className="fas fa-copy"> share Link</i></Button>
        {/* {console.log("Copied" + state.value)} */}

        {/* {state.error
          ? <p>Unable to copy value: {state.error.message}</p>    
          : state.value && <p>Copied {state.value}</p>} */}
      </div>
    )
  }
  export default CopyLink;