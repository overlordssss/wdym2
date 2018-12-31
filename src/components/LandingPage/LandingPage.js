import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { userLogout, room } from '../../dux/reducer';
import {handleToggle} from '../../Test/sean'
import './LandingPage.css';

class LandingPage extends Component {
    constructor() {
        super()

        this.state = {
            userType: false,
            roomCode: 0,
            guestUsername: '',
            rooms: [],
            usernames: []
        }
    }
    componentDidMount() {
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
        let full = true
        let roomIndex = -1
        axios.get('/game/rooms').then(res => {
            let rooms = res.data
            rooms.map((room, i) => {
                if (room.room_number == this.state.roomCode) {
                    exists = true
                    roomIndex = i
                }
            })
            if (exists) {
                let usernames = []
                axios.get(`/api/usernames/${this.state.roomCode}`)
                .then(res => {
                    usernames = res.data
                    console.log('usernames: ', this.state.usernames)
                    //error with this filter, as this.state.usernames does not contain users within room. reamians an empty array. 
                    if (usernames.length < rooms[roomIndex].number_of_players) {
                        full = false
                    }
                    if (full === false) {
                        //set up sockets for existing room
                        let { username } = this.props.user
                        let room = Number(this.state.roomCode)
                        
                        //send username to socket with room number
                        this.props.socket.emit('join room', { room, username })
                        //when specified socket is joined
                        this.props.socket.on('room joined', data => console.log(`Player joined room ${this.state.roomCode}`))
                        //send room to redux
                        this.props.room(room)
                        //send player to game loading view
                        this.props.history.push('/game-loading')
                    } else {
                        alert("Unfortunately that game already has the max number of players. Please create a new game or join a different one.")
                    }
                })
            } else {
                alert("Unfortunately we were not able to find that room. Please check the room number and try again.")
            }
        })
    }

    render() {
        return (
            <div className='landing-page two'>
                <div className='landing-page-inputs'>
                    {this.props.user.username ?
                        <h1 className='landing-text'>Welcome {this.props.user.username}! </h1>
                        : <h1 className='landing-text'>Welcome {this.props.guest}! </h1>}
                    {handleToggle(this.props.user.user_id) ?
                        <Link to='/create-game'><button className='btn'>Create new game</button></Link>
                        : <h3 className='landing-text'>Create an account to host your own games</h3>}
                    <h3 className='landing-text'>Enter Room code to join an existing game</h3>
                    <input
                        className='inputs'
                        type='number'
                        // value={this.state.roomCode}
                        name='roomCode'
                        placeholder='Room Code'
                        onChange={this.handleInputs}
                    />
                    <button className='btn' onClick={this.joinRoom}>Join</button>
                    <div>
                        <button className='btn' onClick={this.logout}>Logout</button>
                        {this.props.guest ?
                            <Link to='/register'>Create an account</Link>
                            : ''}
                    </div>
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


export default connect(mapStateToProps, { userLogout, room })(LandingPage)
