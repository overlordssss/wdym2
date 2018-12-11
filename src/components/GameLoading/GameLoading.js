import React, {Component} from 'react';
import {connect} from 'react-redux';
import {judgeIndex, players, roundsToWin} from '../../dux/reducer';
import axios from 'axios';

 class GameLoading extends Component{
     constructor(){
         super();

         this.state = {
            players: [],
            roundsToWin:0,
            maxPlayers: 0,
            creator: ''
         }
     }
     componentDidMount=() => {
         console.log('props: ', this.props)
         let {room} = this.props 
         axios.get(`/game/roomInfo/${room}`)
         .then( res => {
             console.log('data from endpoint: ', res.data)
             this.setState({
                 roundsToWin: res.data[0].rounds_to_win,
                 maxPlayers: res.data[0].number_of_players,
                 creator: res.data[0].creator
             })
         })
         this.props.socket.on('room joined', data => {
             this.setState({players: data})
         })
         this.props.socket.on('game started', data => {
            console.log('game has been started!')
            this.props.judgeIndex(data.judge)
            this.props.players(data.players)
            this.props.roundsToWin(data.roundsToWin)
            this.props.history.push('/in-game')
        })
     }
     handleClick = () => {
         //generate a random index for the judge
         let judge = Math.floor(Math.random*(this.state.players.length) - 1)

        let {room} = this.props
        let {players, roundsToWin} = this.state

         //send judge index, players and game start to sockets
        this.props.socket.emit('start game', {judge, players, roundsToWin, room})
     }
    render(){
        console.log('state: ', this.state)
    return(
        <div>
            <div className="room-code">
                {/* we need to pass the randomly generated room code to this component and display it within this div */}
                <p>Room code: {this.props.room}</p>
            </div>
            <div>
                <h2>Rounds To Win: {this.state.roundsToWin}</h2>
                <h3>Players</h3>
                <ul className='players'>
                {this.state.players.map(username => {
                    return <li key = {username} >{username}</li>
                })}
                </ul>
            </div>
            {/* basic start button passing the socket players connected to the room to the game */}
            {(this.state.creator === this.props.user.username && this.state.players.length >= 3) ?
            <button onClick={this.handleClick}>START</button>
            : null
            }
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        room: state.room
    }
}


export default connect(mapStateToProps, {judgeIndex, players, roundsToWin})(GameLoading)