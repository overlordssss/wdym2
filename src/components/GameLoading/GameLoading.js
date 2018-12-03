import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

 class GameLoading extends Component{
     constructor(){
         super();

         this.state = {
            players: []
         }
     }
    render(){
        let {
            players,
            roundsToWin
        } = this.props
        console.log(this.props)
    return(
        <div>
            <div class="room-code">
                {/* we need to pass the randomly generated room code to this component and display it within this div */}
                <p>This is where the room code will display</p>
            </div>
            <div>
                <h2>Rounds To Win: {roundsToWin}</h2>
                <h3>Players</h3>
                <ul class='players'>
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
            <Link to='/in-game'><button>START</button></Link>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        players: state.players,
        roundsToWin: state.roundsToWin
    }
}


export default connect(mapStateToProps)(GameLoading)