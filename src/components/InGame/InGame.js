import React, { Component } from 'react';
// import axios from 'axios';
import Judge from '../Judge/Judge';
import Player from '../Player/Player';
import Winner from '../Winner/Winner';
import RoundWinner from '../RoundWinner/RoundWinner';
import JudgePlayerWaiting from '../JudgePlayerWaiting/JudgePlayerWaiting';
import { connect } from 'react-redux';
import Spinner from '../SpinnerComponent/Spinner';
import axios from 'axios';


class InGame extends Component {
    constructor() {
        super();

        this.state = {
            player_index: 0,
            username: '',
            winner: false,
            count: 60,
            judgeIndex: 0,
            fullResponse: false,
            memes: [],
            memeIndex: 0,
            playerData: []
        }
    }
    componentDidMount() {
        // this.responses()
        //get user info, change username in state 
        //missing endpoint
        this.setState({
            username: this.props.user.username,
            judgeIndex: this.props.judgeIndex,

        })
        //find user in players array and change index
        //check if anyone has won(compared with reducer rounds to win)
        this.props.players.map(player => {
            if (player.rounds_won === this.props.roundsToWin) {
                this.setState({ winner: true })
            }
        })
    }
    // responses = () => {
    //     this.props.socket.on('get responses', (data) => {
    //         this.setState({ playerData: data })
    //         if (this.state.playerData.Length === this.props.players) {
    //             this.setState({fullResponse: true})
    //         }
    //     })
    // }

    render() {

        return (
            <div>
                {/* if someone has won */
                console.log('props: ', this.props)}
                {this.props.players === this.props.roundsToWin ?
                    <Winner socket={this.props.socket}/>
                : null}
                {this.state.winner ?
                    <RoundWinner socket={this.props.socket}/>
                    //check to see if player is the judge
                : this.props.user.username === this.props.players[this.props.judgeIndex] ?
                    <JudgePlayerWaiting socket={this.props.socket} history= {this.props.history}/> 
                : <Player socket={this.props.socket} history={this.props.history} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players,
        roundsToWin: state.roundsToWin,
        judgeIndex: state.judgeIndex,
        user: state.user,
        memes: state.memes
    }
}

export default connect(mapStateToProps)(InGame)