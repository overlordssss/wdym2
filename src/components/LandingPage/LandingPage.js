import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    constructor() {
        super()

        this.state = {
            userType: false,
            roomCode: '',
            guestUsername: ''
        }
    }
    logout = () => {

    }
    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                userType ?
                <h1>Welcome {username}! </h1>
                : <h1>Welcome {guest}</h1>
                <button
                    onClick={}
                >Create new game</button>
                <h3>Enter Room code to join an existing game</h3>
                <input
                    type='text'
                    value={this.state.roomCode}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />
                <input
                    type='text'
                    value={this.state.guestUsername}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />
                <div>
                    <Link to='/login'>Logout</Link>
                    <Link to='/register'>Create an account</Link>
                </div>
            </div>
        )
    }
}




export default LandingPage