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
            {/* <label htmlFor="username-input">Username:</label> */}
            <input
              type="text"
              // className="form-control"
              className="userName"
              id="username-input"
              name="username"
              // value=""
              onChange={this.handleInputChange}
              placeholder="Your Name"
            />
            {/* <label htmlFor="password-input">Password:</label> */}
            <input
              type="password"
              // className="form-control"
              className="password"
              id="password-input"
              name="password"
              // value=""
              onChange={this.handleInputChange}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn-signIn" id="sign-in" onClick={this.handleFormSubmit}>Sign In</button>
        </form>
      </>
    )
  }
}

export default SignIn;