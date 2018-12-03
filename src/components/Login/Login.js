import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import axios from 'axios';

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
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        const { username, password } = this.state;
        if (username && password) {
            axios
                .post('/auth/login', user)
                .then(response => {
                    const user = response.data;
                    if (user.id) {
                        // here is where the redux will be updated
                        // here is where we push to landing page if a user is found
                        this.props.history.push('/landing-page');
                    } else (
                        alert('No user found')
                    )
                })
                .catch(err => {
                    console.log(`Error: ${err}`)
                })
        } else if (!username) {
            alert('Please enter a username')
        } else if (!password) {
            alert('Please enter a password')
        }
    }
    // just a method for the input boxes
    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className='login_container'>
                <div className='login_card'>
                    <h1 className='login'>Login</h1>

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

                    <Link to='/landing-page'><button
                        className="login_button"
                        onClick={this.login.bind(this)}
                    >GO!</button></Link>
                    <Link to='/register'><button
                        className='login_register_button'
                        onClick={this.login.bind(this)}
                    >Register!</button></Link>
                    <Link to='/landing-page'><h6>Play as Guest</h6></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

}


export default connect(mapStateToProps)(Login)