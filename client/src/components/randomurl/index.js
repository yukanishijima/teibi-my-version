import React from 'react';
import { Link } from "react-router-dom";

function randomID(){
    let idText = ""
    for (let i = 0; i < 8; i++) {
        if(i === 4){
            idText += "-"
        }
        idText += String.fromCharCode(65 + Math.floor(Math.random() * 26))
    }
    return idText
}


function RandomUrl() {
    return (
        <>
        <Link to={"/Main/" + randomID()}>
        Begin
        </Link><br />
        </>
    )
}

export default RandomUrl;