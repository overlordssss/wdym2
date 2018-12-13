import React, {Component} from 'react';
import {connect} from 'react-redux';
import {judgeIndex, players, roundsToWin, memes} from '../../dux/reducer';
import axios from 'axios';
import './GameLoading.css'

class GameLoading extends Component {
    constructor() {
        super();

        this.state = {
            players: [],
            roundsToWin: 0,
            maxPlayers: 0,
            creator: ''
        }
    }
    componentDidMount = () => {
        let { room } = this.props
        axios.get(`/game/roomInfo/${room}`)
            .then(res => {
                console.log('data from endpoint: ', res.data)
                this.setState({
                    roundsToWin: res.data[0].rounds_to_win,
                    maxPlayers: res.data[0].number_of_players,
                    creator: res.data[0].creator
                })
            })
        this.props.socket.on('room joined', data => {
            this.setState({ players: data })
        })
        this.props.socket.on('game started', data => {
            console.log('game has been started!')
            this.props.judgeIndex(data.judge)
            this.props.players(data.players)
            this.props.roundsToWin(data.roundsToWin)
            this.props.memes(data.memes)
            this.props.history.push('/in-game')
        })
    }
    handleClick = () => {
        //send amount of players to db to change max Players (if need be)
        let currentNumPlayers = this.state.players.length
        let { room } = this.props
        if (currentNumPlayers !== this.state.maxPlayers) {
            axios.put(`/game/updateMax/`, { currentNumPlayers, room })
        }
        let memes = []
        let blankMemes = currentNumPlayers*(this.state.roundsToWin - 1) +1
        axios.get(`/game/memes/:${blankMemes}`).then( res => {
            memes = res.data
        })

         //generate a random index for the judge
         let judge = Math.floor(Math.random()*currentNumPlayers - 1) +1
         console.log('judge Index: ', judge)

        let { players, roundsToWin } = this.state

         //send judge index, players and game start to sockets
        this.props.socket.emit('start game', {judge, players, roundsToWin, memes, room})
     }
    render(){
    return(
        <div className='game-loading-background'>
            <div className='game-loading-container'>
            <div >
                <h1 className="room-code">Room code: {this.props.room}</h1>
            </div>
            <div className='display-list'>
                <h1 className='rounds'>Rounds To Win: {this.state.roundsToWin}</h1>
                <h1 className='le-players'>Players</h1>
                <ul className='players'>
                {this.state.players.map(username => {
                    return <h1 key = {username} >{username}</h1>
                })}
                </ul>
            </div>
            {/* basic start button passing the socket players connected to the room to the game */}
            {(this.state.creator === this.props.user.username && this.state.players.length >= 3) ?
            <button onClick={this.handleClick}>START</button>
            : null
            }
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        room: state.room,
        guest: state.guestUsername
    }
}


export default connect(mapStateToProps, {judgeIndex, players, roundsToWin, memes})(GameLoading)
