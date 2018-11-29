import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
                        placeholder="Password"
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