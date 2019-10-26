import React, { Component } from 'react';
import API from "../utils/API";

class SignIn extends Component {
    state = {
        username: "",
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
            password: this.state.password
        };

        API.loginUser({userData})
            .then(res => {
                console.log("successful login");

            })
            .catch(err => {
                console.log(err)

            });

    };

    render() {
        return (
            <>
                <h1>Sign in</h1>
            </>
        )
    }
}

export default SignIn;