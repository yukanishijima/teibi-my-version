import React from "react";
import "./nomatch.css";
function NoMatch() {
  return (
      <div className="page-container">
        <h1 className="title">404</h1>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <img src={require("./broken.gif")} alt="I am broken" className="img-responsive bg" />
        </div>
      </div>
  );
}
export default NoMatch;
