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
    // skeleton method for loging out. will just route the user to the login page and destroy the session
    logout = () => {

    }
    // basic method for handling any user inputs on this view
    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                {/* not sure if the logic here is correct but this will render different text based on the user being a guest or an actual user with an account */}
                userType ?
                <h1>Welcome {username}! </h1>
                : <h1>Welcome {guest}</h1>

                {/* no functionallity here yet but this will be the create game button that will route the user to the create game view */}
                <button
                    onClick={}
                >Create new game</button>

                {/* here is where the user can enter a code to enter an already created game */}
                <h3>Enter Room code to join an existing game</h3>
                <input
                    type='text'
                    value={this.state.roomCode}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />

                {/* this is where the guest can enter their username */}
                <input
                    type='text'
                    value={this.state.guestUsername}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />

                {/* just a container for some links to logout and route a guest to the register account page if they want to be able to create a game */}
                <div>
                    <Link to='/login'>Logout</Link>
                    <Link to='/register'>Create an account</Link>
                </div>
            </div>
        )
    }
}




export default LandingPage