import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoundWinner.css';
import { roundNum, playerData, winningMeme } from '../../dux/reducer'
import axios from 'axios'

class RoundWinner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: {},
            count: 7
        }
    }

    componentDidMount() {
        //add one point to round winner
        let { room } = this.props
        let { username } = this.props.winningMeme
        axios.put(`/api/add_point/`, { room, username })
            .then(res => {
                this.setState({ winner: res.data })
            })
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
        //check if total winner
        if (this.state.winner.rounds_won === this.props.roundsToWin) {
            this.props.history.push('/winner')
        } else {
            //reset everything for new round
            let { round } = this.props
            this.props.roundNum(round + 1)
            this.props.playerData([])
            this.props.winningMeme([])
            this.props.history.push('/in-game')
        }
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
                        <div className='round-winner'>
                            <img src={`${this.props.memes[this.props.round].url}`} alt='' />
                            <div>
                                <p>{this.props.winningMeme.inputTop}</p>
                                <p>{this.props.winningMeme.inputBottom}</p>
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
        roundsToWin: state.roundsToWin
    }
}

export default connect(mapStateToProps, { roundNum, playerData, winningMeme })(RoundWinner)