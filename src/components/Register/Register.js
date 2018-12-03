import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            confirmpass: ''
        }
    }
    // skeleton register endpoint here to register a new user. Some logic here should check that the username doesn't exist and that the password and confirm passwords actually match.
    register = (e) => {
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        if (
            this.state.password !== '' &&
            this.state.password === this.state.confirmpass
        ) {
            axios
                .post('/auth/register', user)
                .then(result => {
                    console.log(result);
                    this.props.history.push('/')
                })
                .catch(err => {
                    console.log(`Error: ${err}`)
                })
        } else if (this.state.username === '') {
            alert('Please enter a valid username')
        } else (
            alert(`Passwords must match`)
        )
    }
    // basic method to handle any user inputs.
    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className='register_container'>
                <div className='register_card'>
                    <h1>Register</h1>
                    <input
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleInputs}
                    />

                    <input
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleInputs}
                    />
                    <input
                        type="password"
                        value={this.state.confirmpass}
                        placeholder="Confirm password"
                        onChange={this.handleInputs}
                    />
                    <Link to='/'><button
                        className="login_button"
                    // onClick={this.login.bind(this)}
                    >Register!</button></Link>
                </div>
            </div>
        )
    }
}



export default Register