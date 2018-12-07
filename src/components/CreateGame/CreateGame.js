import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client'
import { roundsToWin, players, numberOfPlayers } from '../../dux/reducer';
import axios from 'axios';
import './CreateGame.css';

class CreateGame extends Component {
    constructor() {
        super();

        this.state = {
            numberOfPlayers: 3,
            roundsForWin: 0,
            rooms: []
        }
    }
    componentDidMount = () => {
        //axios request to get rooms
        axios.get('/game/rooms').then( res =>this.setState({rooms: res.data}) )
    }
    //number of players input
    handlePlayerInput = (e) => {
        let amountOfPlayers = e.target.value
        if (amountOfPlayers > 10) {
            alert('Cannot have more than 10 players per game!')
        } else if (amountOfPlayers < 3) {
            alert('Cannot have less than 3 players per game!')
        } else {
            this.setState({ numberOfPlayers: amountOfPlayers })
        }
    }
    handleRoundInput = (e) => {
        let roundInput = e.target.value
        if (roundInput > 10) {
            alert('10 rounds is the limit!')
        } else {
            this.setState({ roundsForWin: roundInput })
        }
    }
    handleSubmit = () => {
        console.log('state at submit: ', this.state, 'props: ', this.props)
        this.props.roundsToWin(this.state.roundsForWin)
        this.props.numberOfPlayers(this.state.numberOfPlayers)
        
        //create a number for room
        let newRoom = 0;
        //check if room exists
        let duplicate = false;
        do {
            newRoom = Math.floor(Math.random() * 8999) + 1000
            this.state.rooms.map(room => {
                if (room.room_number === newRoom) {
                    duplicate = true
                }
            })
        } while (duplicate === true)
        //once an unused rooom code is generated, pass it to the db
        axios.post(`/game/newRoom`, {newRoom})
        
        this.props.players([{ username: this.props.user.username, rounds_won: 0, input_top: '', input_bottom: '',room: newRoom, role: '' }])
        //set up a socket for the room
        this.socket = io('http://localhost:4004');
        this.socket.on('room joined', data => console.log(`User joined room: ${newRoom}`))
        this.socket.emit('join room', {newRoom})
        //once a room is joined, go to GameLoading view (prop passed down from Landing Page view)
        this.props.history.push('/game-loading')
    }
    render() {
        console.log('props: ', this.props, 'state: ', this.state)
        return (
            <div className='create-game'>
                <p>Max number of Players</p>
                <input type='number' onChange={this.handlePlayerInput} value={this.state.numberOfPlayers} maxLength='2' /><p>(Min 3; Max 10)</p>
                <p>Rounds to win</p>
                <input type='number' onChange={this.handleRoundInput} /><p>(Max 10)</p>
                <p>Custom images</p>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps, { roundsToWin, players, numberOfPlayers })(CreateGame)
