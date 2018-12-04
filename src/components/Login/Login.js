import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { username, guestUsername } from '../../dux/reducer';
import './Login.css';
import axios from 'axios';

class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: '',
            guest: ''
        }
    }
    // the skeleton login method. Functionality will include an axios call to the server endpoint for authentication.
    // maybe also adding some logic for checking if there is a password and username.
    login = () => {
        console.log('Hit the login frontend')
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
                    if (user.user_id) {
                        // here is where the redux will be updated
                        this.props.username(response.data);
                        // here is where we push to landing page if a user is found
                        this.props.history.push('/landing-page');
                    } else if (response.status === 401) {
                        alert(`Please enter valid login credentials`)
                    }
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
    guestLogin = () => {

        if (this.state.guest !== '') {
            this.props.guestUsername(this.state.guest)
            this.props.history.push('/landing-page')
        } else {
            alert('Guest name must not be empty')
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
                        name='username'
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleInputs}
                    />
                    {/* password input on the login card */}
                    <input
                        type="password"
                        name='password'
                        value={this.state.password}
                        placeholder="Password"
                        onChange={this.handleInputs}
                    />

                    <button
                        className="login_button"
                        onClick={this.login}
                    >GO!</button>
                    <Link to='/register'>
                        <button
                            className='login_register_button'
                        >Register!</button>
                    </Link>
                    <h3>Play as Guest</h3>
                    <input
                        type="text"
                        name='guest'
                        value={this.state.guest}
                        placeholder="Guest username"
                        onChange={this.handleInputs}
                    />
                    <button
                        onClick={this.guestLogin}
                    >GO!</button>
                </div>
            </div>
        )
    }
}


export default connect(null, { username, guestUsername })(Login)
