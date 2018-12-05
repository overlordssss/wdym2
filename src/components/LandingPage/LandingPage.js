import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GameLoading from '../GameLoading/GameLoading'
import axios from 'axios';
<<<<<<< HEAD
=======
import {userLogout} from '../../dux/reducer';
>>>>>>> master

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
        axios.get(`/auth/logout`).then(() => { });
        this.props.history.push('/')
        this.props.userLogout()
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
        if (exists) {
            this.props.history.push('/game-loading')
        } else {
            alert("Unfortunately we were not able to find that room. Please check the room number and try again")
        }
    }


    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.user.username ?
                    <h1>Welcome {this.props.user.username}! </h1>
                    : <h1>Welcome {this.props.guest}! </h1>}
<<<<<<< HEAD
                {this.props.username.username ?
                    <Link to='/create-game'><button>Create new game</button></Link>
                    : <h3>Create an account to host your own games</h3>}
=======
                {this.props.user.username ? 
                <Link to='/create-game'><button>Create new game</button></Link>
                : <h3>Create an account to host your own games</h3>}
>>>>>>> master
                <h3>Enter Room code to join an existing game</h3>
                <input
                    type='number'
                    // value={this.state.roomCode}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />
                <button onClick={this.joinRoom}>Join</button>
                <div>
                    <button onClick={this.logout}>Logout</button>
<<<<<<< HEAD
                    <Link to="/register">
                        <button>Create an account!</button>
                    </Link>
                    {/* <Link to='/'>Logout</Link>
                    <Link to='/register'>Create an account</Link> */}
=======
                    {this.props.guest ? 
                    <Link to='/register'>Create an account</Link>
                    : ''}
>>>>>>> master
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        guest: state.guestUsername,
        rooms: state.rooms
    }
}


export default connect(mapStateToProps, {userLogout})(LandingPage)