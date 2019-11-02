import React from 'react';
import { useCopyToClipboard } from "react-use";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopyLink = (props) => {
    const [ setText] = React.useState('');
    const [state, copyToClipboard] = useCopyToClipboard();
    console.log(props);
    function notify (){ 
      toast("Your Link is copied. Share it!",{
        position: "bottom-left",
        autoClose: 3000
      })
    };
    return (
      <div>
        <input type="hidden" value={props.text} onChange={e => setText(e.target.value)} />
        <ToastContainer />
        <button id="copyButton" type="button" onClick={() => {copyToClipboard(props.text); notify()}}><i className="fas fa-copy"> share Link</i></button>
        {console.log("Copied" + state.value)}

        {/* {state.error
          ? <p>Unable to copy value: {state.error.message}</p>    
          : state.value && <p>Copied {state.value}</p>} */}
      </div>
    )
  }
  export default CopyLink;