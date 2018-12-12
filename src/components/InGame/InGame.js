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
            judgeIndex: 0
        }
    }
    // componentDidMount(){
    //     axios.get()

    // }

    componentDidMount() {
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


    render() {

        return (
            <div>
                {/* if someone has won */}
                {this.props.players === this.props.roundsToWin ?
                    <Winner />
                    : null}
                {this.state.winner ?
                    <RoundWinner />
                    //check to see if player is the judge
                    : this.props.user.username === this.props.players[this.props.judgeIndex] ?
                        <JudgePlayerWaiting />
                        //
                        : <Player history={this.props.history} />
                }
                {}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players,
        roundsToWin: state.roundsToWin,
        judgeIndex: state.judgeIndex,
        user: state.user
    }
}

export default connect(mapStateToProps)(InGame)