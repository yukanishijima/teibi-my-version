import React from "react";
import 'normalize.css';
import "./style.css";
import {Link} from "react-router-dom"

function NoMatch() {
  return (
    <div className="page-container">
      
      <p className="title">
        404 <br />
      <Link to="/"><img src="/images/Logo.png" width="50" height="50" z-index="100"/></Link>
      </p>
      <div className="errorImage">
        <div className="gradient">
        </div>
      </div>
    </div>  
  );
}
export default NoMatch;
