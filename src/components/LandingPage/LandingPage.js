import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GameLoading from '../GameLoading/GameLoading';

class LandingPage extends Component {
    constructor() {
        super()

        this.state = {
            userType: false,
            roomCode: 0,
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
    //join room method 
    joinRoom = () => {
        let exists = false
        this.props.rooms.map(room => {
            if (room === this.state.roomCode) {
                exists = true
            }
        })
        // exists ? <GameLoading /> : alert("Unfortunately we were not able to find that room. Please check the room number and try again")
    }


    render() {
        let {
            username,
            guest
        } = this.props
        console.log(this.props)
        return (
            <div>
                {this.props.username.username ?
                    <h1>Welcome {this.props.username.username}! </h1>
                    : <h1>Welcome {this.props.guest}! </h1>}
                {this.props.username.username ? 
                <Link to='/create-game'><button>Create new game</button></Link>
                : <h3>Create an account to host your own games</h3>}
                <h3>Enter Room code to join an existing game</h3>
                <input
                    type='number'
                    value={this.state.roomCode}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />
                <button onClick = {this.joinRoom}>Join</button>
                <div>
                    <Link to='/'>Logout</Link>
                    <Link to='/register'>Create an account</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        guest: state.guestUsername
    }
}


export default connect(mapStateToProps)(LandingPage)