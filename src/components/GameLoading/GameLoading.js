import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {judgeIndex} from '../../dux/reducer';
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
            console.log('data from socket: ', data)
             this.setState({players: data})
         })
     }
    render(){
        console.log('state: ', this.state)
    return(
        <div>
            <div className="room-code">
                {/* we need to pass the randomly generated room code to this component and display it within this div */}
                <p>This is where the room code will display</p>
                <p>Room code: {this.props.room}</p>
            </div>
            <div>
                <h2>Rounds To Win: {this.state.roundsToWin}</h2>
                <h3>Players</h3>
                <ul className='players'>
                {this.state.players.map(username => {
                    return <li key = {username} >{username}</li>
                })}
                {/* We are wanting this list to conditionally render the room size, based on how many people the game creator has selected as the max number of players */}

                    <li>Hi</li>
                    <li>There</li>
                    <li>This</li>
                    <li>Is</li>
                    <li>Where</li>
                    <li>Players</li>
                    <li>Will</li>
                    <li>Wait</li>
                </ul>
            </div>
            {/* basic start button passing the socket players connected to the room to the game */}
            {(this.state.creator === this.props.user.username) ?
            <Link to='/in-game'><button>START</button></Link>
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


export default connect(mapStateToProps, {judgeIndex})(GameLoading)