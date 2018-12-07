import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {userLogout, room } from '../../dux/reducer';

class LandingPage extends Component {
    constructor() {
        super()

        this.state = {
            userType: false,
            roomCode: 0,
            guestUsername: '',
            rooms: []
        }
    }
    componentDidMount() {
        axios.get('/game/rooms').then( res => this.setState({rooms: res.data}))
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
        console.log('State: ', this.state)
        let exists = false
        this.state.rooms.map(room => {
            if (room.room_number == this.state.roomCode) {
                exists = true
            }
        })
        if (exists) {
            //set up sockets for existing room
            let {username} = this.props.user
            let room = Number(this.state.roomCode)

            //send username to socket with room number
            this.props.socket.emit('join room', {room, username})
            //when specified socket is joined
            this.props.socket.on('room joined', data => console.log(`Player joined room ${room}`))
            //send room to redux
            this.props.room(room)

            //send player to game loading view
            this.props.history.push('/game-loading')
        } else {
            alert("Unfortunately we were not able to find that room. Please check the room number and try again")
        }
    }


    render() {
        console.log(this.props)
        return (
            <div className='landing-page'>
                {this.props.user.username ?
                    <h1>Welcome {this.props.user.username}! </h1>
                    : <h1>Welcome {this.props.guest}! </h1>}
                {this.props.user.username ? 
                <Link to='/create-game'><button>Create new game</button></Link>
                : <h3>Create an account to host your own games</h3>}
                <h3>Enter Room code to join an existing game</h3>
                <input
                    type='number'
                    // value={this.state.roomCode}
                    name='roomCode'
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />
                <button onClick={this.joinRoom}>Join</button>
                <div>
                    <button onClick={this.logout}>Logout</button>
                    {this.props.guest ? 
                    <Link to='/register'>Create an account</Link>
                    : ''}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        guest: state.guestUsername, 
        players: state.players
    }
}


export default connect(mapStateToProps, {userLogout, room })(LandingPage)