import React from "react";
import 'normalize.css';
import "./nomatch.css";
import { Link } from "react-router-dom"

function NoMatch() {
  return (
    <div className="page-container">

      <p className="title">
        404 <br />
      <Link to="/"><img alt="logo" src="/images/Logo2.png" width="200" height="200" z-index="100"/></Link>
      </p>
      <div className="errorImage">
        <div className="gradient">
        </div>
      </div>
    </div>
  );
}
export default NoMatch;
