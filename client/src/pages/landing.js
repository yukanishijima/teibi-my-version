import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Landing extends Component {

  randomID() {
    let idText = ""
    for (let i = 0; i < 8; i++) {
      if (i === 4) {
        idText += "-"
      }
      idText += String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }
    return idText
  }

  render() {
    return (
      <>
        <Redirect to={"/main/" + this.randomID()} />
      </>
    )
  }

}

export default Landing;