import React, {Component} from 'react';
import {connect} from 'react-redux';
import {roundsToWin, players} from '../../dux/reducer'
import io from 'socket.io-client'

class CreateGame extends Component {
    constructor() {
        super();

        this.state = {
            numberOfPlayers: 0,
            roundsForWin: 0,
            room: 0
        }
    }
    componentDidMount = () => {
        //axios request to get username
    }
    //number of players input
    handlePlayerInput = (e) => {
        let amountOfPlayers = e.target.value
        this.setState({ numberOfPlayers: amountOfPlayers })
    }
    handleRoundInput = (e) => {
        let roundInput = e.target.value
        this.setState({ roundsForWin: roundInput })
    }
    handleSubmit = () => {
        this.props.roundsToWin(this.state.roundsForWin)

        //create a number for room
        let newRoom = 0;
        //check if room exists
        let duplicate = false;
        do { 
            newRoom = Math.floor(Math.random()*8999) + 1000
            this.props.rooms.map(room => {
                if (room === newRoom) {
                    duplicate = true
                }
            })
         } while (duplicate === true)
        this.props.rooms.push(newRoom)

        this.socket =io();
        //once a room is joined, go to GameLoading view (prop passed down from Landing Page view)
        this.props.join()
        this.socket.on('room joined', data => {
        })
    }
    render() {
        return (
            <div>
                <p>Max number of Players</p>
                <input type='number' onChange={this.handlePlayerInput} /><p>(Min 3; Max 10)</p>
                <p>Rounds to win</p>
                <input type='number' /><p>(Max 10></p>
                <p>Custom images</p>
                <button>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    
}

export default connect(mapStateToProps, {roundsToWin})(CreateGame)
