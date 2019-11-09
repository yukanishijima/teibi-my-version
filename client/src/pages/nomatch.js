import React from "react";
import 'normalize.css';
import "./nomatch.css";
import {Link} from "react-router-dom"

function NoMatch() {
  return (
    <div className="page-container">
      <p className="title">
        404 <br />
      woops<br />
      <Link to="/">back</Link>
      </p>
      <div className="errorImage">
        <div className="gradient">
        </div>
      </div>
    </div>
  );
}
export default NoMatch;
