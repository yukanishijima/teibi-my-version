import React, { Component } from "react";
import API from "../utils/API";

var bcrypt = require("bcryptjs");

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: ""

    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    };

    handleFormSubmit = event => {
        event.preventDefault();

        var userData = {
            username: this.state.username,
            email: this.state.email,
            password: bcrypt.hashSync(this.state.password, bcrypt.genSaltSync(10), null)
        };

        var loginData = {
            username: this.state.username,
            password: this.state.password
        }

        API.saveUser(userData)
            .then(res => {
                console.log("user saved");
                alert("Successful sign up!");
                // window.location.replace("/signin");

                API.loginUser(loginData)
                    .then(res => {
                        console.log("successful login");
                        console.log(res.data);
                        window.location.replace("/");
                        // console.log(res.data.username);

                    })
                    .catch(err => {
                        console.log(err)
                        // alert("Please ensure your username and password are valid.");

                    });
                    
            })
            .catch(err => {
                console.log(err)
            });

    };

    render() {
        return (
            <>
                <p>{this.state.username}</p>
                <p>{this.state.email}</p>
                <p>{this.state.password}</p>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header">Sign Up</h4>

                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username-input">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username-input"
                                            name="username"
                                            // value=""
                                            onChange={this.handleInputChange}
                                        />
                                        <label htmlFor="email-input">Email:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email-input"
                                            name="email"
                                            // value=""
                                            onChange={this.handleInputChange}
                                        />
                                        <label htmlFor="password-input">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password-input"
                                            name="password"
                                            // value=""
                                            onChange={this.handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" id="sign-up" onClick={this.handleFormSubmit}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default SignUp;