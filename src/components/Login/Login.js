import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { linkSync } from 'fs';

class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }
    // the skeleton login method. Functionality will include an axios call to the server endpoint for authentication.
    // maybe also adding some logic for checking if there is a password and username.
    login = () => {

    }
    // just a method for the input boxes
    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <div className='login_card'>
                    <h1>Login</h1>
                    {/* username input on the login card */}
                    <input
                        type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleInputs}
                    />
                    {/* password input on the login card */}
                    <input
                        type="password"
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleInputs}
                    />
                    {/* button for loggin in */}
                    <button
                        className="login_button"
                        onClick={this.login.bind(this)}
                    >GO!</button>

                    {/* button that will route to the register page */}
                    <Link>
                        <button
                            className='login_register_button'
                            onClick={this.login.bind(this)}
                        >Register!</button>
                    </Link>

                    {/* this will route a player to the landing page bypassing the login but they will have a more limited experience */}
                    <h6><Link>Play</Link> as Guest</h6>
                </div>
            </div>
        )
    }
}




export default Login