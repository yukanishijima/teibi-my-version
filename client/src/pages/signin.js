import React, { Component } from 'react';
import API from "../utils/API";

// initialize socket
import { socket } from "../components/socket";

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
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h4 className="card-header">Sign In</h4>

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
                                    <button type="submit" className="btn btn-primary" id="sign-in" onClick={this.handleFormSubmit}>Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

export default SignIn;