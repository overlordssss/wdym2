import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roundsToWin, players, numberOfPlayers, room } from '../../dux/reducer';
import axios from 'axios'

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
        let roundsToWin = Number(this.state.roundsForWin)
        let maxPlayers = Number(this.state.numberOfPlayers)
        console.log("Going to database: ", roundsToWin, maxPlayers, newRoom)
        axios.post(`/game/newRoom`, { newRoom, roundsToWin, maxPlayers }).then(res => {
            console.log('Db is updated with room info')
            let { username } = this.props.user
            this.props.players([{ username: username, rounds_won: 0 }])

            //set up a socket for the room
            this.props.socket.emit('create room', { newRoom, username })

            this.props.socket.on('room created', data => console.log(`User created room: ${newRoom}`))

            //once a room is created, save room to redux and go to GameLoading view 
            this.props.room(newRoom)
            this.props.history.push('/game-loading')
        })
    }
    render() {
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


export default connect(mapStateToProps, { roundsToWin, players, numberOfPlayers, room })(CreateGame)
