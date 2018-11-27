import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }
    login = () => {

    }
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

                    <button
                        className="login_button"
                        onClick={this.login.bind(this)}
                    >GO!</button>
                    <button
                        className='login_register_button'
                        onClick={this.login.bind(this)}
                    >Register!</button>
                    <h6>Play as Guest</h6>
                </div>
            </div>
        )
    }
}




export default Login