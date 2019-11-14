import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import "./style.css";

class Help extends Component {
  render() {
    return (
      <>
        <Button><img id="helpIcon" src="/images/teibiLogo.png" alt="logo"/></Button>
      </>
    )
  }
}

export default Help;