import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roundsToWin, players, numberOfPlayers, room } from '../../dux/reducer';
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
        axios.get('/game/rooms').then(res => this.setState({ rooms: res.data }))
    }
    //number of players input
    handlePlayerInput = (e) => {
        let amountOfPlayers = e.target.value
        if (amountOfPlayers > 10) {
            alert('Cannot have more than 10 players per game!')
        } else if (amountOfPlayers < 3) {
            alert('Cannot have less than 3 players per game!')
        }
        this.setState({ numberOfPlayers: amountOfPlayers })
    }
    handleRoundInput = (e) => {
        let roundInput = e.target.value
        if (roundInput > 10) {
            alert('10 rounds is the limit!')
        }
        this.setState({ roundsForWin: roundInput })
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
        let roundsToWin = Number(this.state.roundsForWin)
        let maxPlayers = Number(this.state.numberOfPlayers)
        console.log("Going to database: ", roundsToWin, maxPlayers, newRoom)
        axios.post(`/game/newRoom`, { newRoom, roundsToWin, maxPlayers }).then(res => {
            console.log('Db is updated with room info')
            let { username } = this.props.user
            this.props.players([{ username: username, rounds_won: 0 }])

            //set up a socket for the room
            this.props.socket.emit('create room', { newRoom, username })

            this.props.socket.on('room created', data => {
                console.log(`User created room: ${newRoom}`)
                this.props.history.push('/game-loading')
            })

            //once a room is created, save room to redux and go to GameLoading view 
            this.props.room(newRoom)
        })
    }
    render() {
        console.log('rounds to win: ', this.state.roundsForWin)
        console.log(typeof this.state.roundsForWin)
        return (
            <div className='create-game'>
                <div className='createGameContainer'>
                    <h1 className='displayPlayer'>Max number of Players</h1>
                    <input type='number' onChange={this.handlePlayerInput} value={this.state.numberOfPlayers} maxLength='2' className='inputs' /><h2 className='displayPlayer'>(Min 3; Max 10)</h2>
                    <h1 className='displayPlayer'>Rounds to win</h1>
                    <input type='number' onChange={this.handleRoundInput} className='inputs' /><h2 className='displayPlayer'>(Max 10)</h2>
                    {/* <h1 className='displayPlayer'>Custom images</h1> */}
                    {(this.state.roundsForWin <= 10 && this.state.roundsForWin > 0
                        && this.state.numberOfPlayers >= 3 && this.state.numberOfPlayers <= 10) ?
                        <button onClick={this.handleSubmit} className='btn'>Submit</button>
                        : null
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps, { roundsToWin, players, numberOfPlayers, room })(CreateGame)
