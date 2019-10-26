import React, { Component } from 'react';
import API from "../utils/API";

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
            password: this.state.password
        };

        API.saveUser({userData})
            .then(res => {
                console.log("user saved");

            })
            .catch(err => {
                console.log(err)

            });

    };

    render() {
        return (
            <>
                <h1>Sign up</h1>
            </>
        )
    }
}

export default SignUp;