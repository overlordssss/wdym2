import React, { Component } from 'react';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            confirmpass: ''
        }
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
                    <button
                        className="login_button"
                        onClick={this.login.bind(this)}
                    >Register!</button>
                </div>
            </div>
        )
    }
}



export default Register