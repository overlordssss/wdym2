import React, { Component } from 'react';
import axios from 'axios';
import Judge from '../Judge/Judge';
import Player from '../Player/Player';
import Winner from '../Winner/Winner';
import RoundWinner from '../RoundWinner/RoundWinner';
import JudgePlayerWaiting from '../JudgePlayerWaiting/JudgePlayerWaiting';

class InGame extends Component {
    constructor() {
        super();

        this.state = {
            player_index: 0,
            username: '',
            winner: false
        }
    }
    componentDidMount() {
        //get user info, change username in state 
        //missing endpoint
        this.setState({ username: res.data.username })
        //find user in players array and change index
        this.props.players.map((user, i) => {
            if (user.username === this.state.username) { this.setState({ player_index: i }) }
        })
        //check if anyone has won(compared with reducer rounds to win)
        this.props.players.map(player => {
            if (player.rounds_won === this.props.roundsToWin) {
                this.setState({ winner: true })
            }
        })
    }
    render() {
        if (this.state.winner === true) {
           return <Winner />
        } else {
            //conditional rendering depending on role
            if (player_index === this.props.judgeIndex) {
                return <Judge />
            } else {
                return <Player />
            }
        }
    }
}