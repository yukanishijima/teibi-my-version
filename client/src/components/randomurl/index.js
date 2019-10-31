import React from 'react';
import { Link } from "react-router-dom";

// Generate a random ID XXXX-XXXX
// Currently set to letters only in uppercase
function randomID() {
  let idText = ""
  for (let i = 0; i < 8; i++) {
    if (i === 4) {
      idText += "-"
    }
    idText += String.fromCharCode(65 + Math.floor(Math.random() * 26))
  }
  return idText
}

// Returns the Link to a random URL
function RandomUrl() {
  return (
    <>
      <Link to={"/main/" + randomID()}>
        Begin
        </Link><br />
    </>
  )
}

export default RandomUrl;