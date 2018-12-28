import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoundWinner.css';
import { roundNum, playerData, memeWinner, newJudge } from '../../dux/reducer'
import axios from 'axios'

class RoundWinner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: {},
            count: 7,
            round: 0
        }
    }

    componentDidMount() {
        this.setState({
            winner: this.props.winningMeme,
            round: this.props.round
        })
        this.props.socket.on('end game', () => {
            this.props.history.push('/winner')
        })
        this.props.socket.on('new stats', data => {
            console.log('new stats data', data)
            this.props.roundNum(data.newRound)
            this.props.newJudge(data.newJudgeIndex)
        })
        if(this.props.user.username === this.props.players[this.props.judgeIndex]) {
            console.log('this was hit')
            let { room } = this.props
            //add one point to round winner
            let newRound = this.props.round +1
            let newJudgeIndex = this.props.judgeIndex +1
            setTimeout(() => {
                this.props.socket.emit('new round', {room, newRound, newJudgeIndex})
            }, 2000)
        }
        this.timer()
    }

    timer = () => {
        setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: this.state.count - 1
                })
            }
        }, 1000);
    }

    handleNextRound = () => {
        if(this.props.username === this.props.players[this.props.judgeIndex]) {
            
            let { room } = this.props
            let { username } = this.props.winningMeme
            axios.put(`/api/add_point/`, { room, username })
            .then(res => {
                //check if total winner
                console.log('rounds won: ', res.data.rounds_won)
                console.log('rounds to win: ', this.props.roundsToWin)
                if(res.data.rounds_won === this.props.roundsToWin) {
                    this.props.socket.emit('Game winner', {room})
                } 
            })
        }
        //reset everything for new round
        this.props.playerData([])
        this.props.memeWinner([])
        this.props.history.push('/in-game')
    }

    render() {
        return (
            <div>
                {this.state.count > 0 ?
                    <div className='round-winner'>
                        <h1 className='winning-user'>
                            {/* round winner will be a prop passed from the judge view */}
                            Round Winner is: {this.props.winningMeme.username}
                        </h1>
                        {this.state.count}
                        <div className='le-meme'>
                            <img src={`${this.props.memes[this.state.round].url}`} alt='' className='user-meme'/>
                            <div className='meme-inputs'>
                                <p className='input-top'>{this.props.winningMeme.inputTop}</p>
                                <p className='input-bottom'>{this.props.winningMeme.inputBottom}</p>
                            </div>
                        </div>
                    </div>
                : this.handleNextRound()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        winningMeme: state.winningMeme,
        memes: state.memes,
        round: state.round,
        room: state.room,
        roundsToWin: state.roundsToWin,
        players: state.players,
        judgeIndex: state.judgeIndex
    }
}

export default connect(mapStateToProps, { roundNum, playerData, memeWinner, newJudge })(RoundWinner)