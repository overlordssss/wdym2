import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userLogout } from '../../dux/reducer';
import io from 'socket.io-client'

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
        axios.get('/game/rooms').then(res => this.setState({ rooms: res.data }))
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
        this.state.rooms.map(room => {
            if (room === this.state.roomCode) {
                exists = true
            }
        })
        if (exists) {
            //set up sockets for existing room
            let room = this.state.roomCode
            this.socket = io('http://localhost:4004')
            this.socket.on('room joined', data => console.log(`Player joined room ${room}`))
            this.socket.emit('room joined', { room })

            //push player info to players array
            this.props.players([...this.props.players, { username: this.props.user.username, rounds_won: 0, input_top: '', input_bottom: '', room: room, role: '' }])

            //send player to game loading view
            this.props.history.push('/game-loading')
        } else {
            alert("Unfortunately we were not able to find that room. Please check the room number and try again")
        }
    }


    render() {
        // console.log(this.props)
        return (
            <div>
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
    }
}


export default connect(mapStateToProps, { userLogout })(LandingPage)