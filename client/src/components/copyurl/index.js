import React from 'react';
import { useCopyToClipboard } from "react-use";
const CopyLink = (props) => {
    const [ setText] = React.useState('');
    const [state, copyToClipboard] = useCopyToClipboard();
    console.log(props);
    return (
      <div>
        <input type="hidden" value={props.text} onChange={e => setText(e.target.value)} />
        <button type="button" onClick={() => copyToClipboard(props.text)}>copy URL</button>
        {state.error
          ? <p>Unable to copy value: {state.error.message}</p>
          : state.value && <p>Copied {state.value}</p>}
      </div>
    )
  }
  export default CopyLink;