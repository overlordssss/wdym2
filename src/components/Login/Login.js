import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Login.css';

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
            <div className='login_container'>
                <div className='login_card'>
                    <h1 className='login'>Login</h1>

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