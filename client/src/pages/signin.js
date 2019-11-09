import React, { Component } from 'react';
import API from "../utils/API";


class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    var userData = {
      username: this.state.username,
      password: this.state.password
    };

    API.loginUser(userData)
      .then(res => {
        console.log("successful login");
        console.log(res.data);
        window.top.location.replace("/main/" + this.props.location.search.replace("?", ""));
        // console.log(res.data.username);

      })
      .catch(err => {
        console.log(err)
        alert("Please ensure your username and password are valid.");

      });

  };

  render() {

    return (
      <>
        <form>

          <div className="form-group">

            <input
              type="text"
              className="userName"
              id="username-input"
              name="username"
              // value=""
              onChange={this.handleInputChange}
              placeholder="Your Name"
              autoComplete="false"
            />

            <input
              type="password"
              // className="form-control"
              className="password"
              id="password-input"
              name="password"
              onChange={this.handleInputChange}
              placeholder="Password"
              autoComplete="false"
            />

          </div>

          <button type="submit" className="btn-signIn" id="sign-in" onClick={this.handleFormSubmit}>Sign In</button>

        </form>
      </>
    )
  }
}

export default SignIn;