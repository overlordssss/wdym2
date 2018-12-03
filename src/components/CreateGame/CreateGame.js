import React, {Component} from 'react';
import {connect} from 'react-redux';
import {roundsToWin, players, numberOfPlayers} from '../../dux/reducer';
import {Link} from 'react-router-dom';

class CreateGame extends Component {
    constructor() {
        super();

        this.state = {
            numberOfPlayers: 0,
            roundsForWin: 0,
            playerUsername: ''
        }
    }
    componentDidMount = () => {
        //axios request to get username
    }
    //number of players input
    handlePlayerInput = (e) => {
        let amountOfPlayers = e.target.value
        if(amountOfPlayers > 10){
            alert('Cannot have more than 10 players per game!')
        } else {
        this.setState({ numberOfPlayers: amountOfPlayers })
        }
    }
    handleRoundInput = (e) => {
        let roundInput = e.target.value
        if(roundInput > 10){
            alert('10 rounds is the limit!')
        } else {
        this.setState({ roundsForWin: roundInput })
        }
    }
    handleSubmit = () => {
        this.props.players.push({username: this.props.username, rounds_won:0, input_top: '', input_bottom: '', role: ''})
        this.props.roundsToWin(this.state.roundsForWin)
        this.props.numberOfPlayers(this.state.numberOfPlayers)
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <p>Max number of Players</p>
                <input type='number' onChange={this.handlePlayerInput} maxLength='2'/><p>(Min 3; Max 10)</p>
                <p>Rounds to win</p>
                <input type='number' onChange={this.handleRoundInput}/><p>(Max 10)</p>
                <p>Custom images</p>
                <Link to='/game-loading'><button>Submit</button></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        username: state.username
    }
}


export default connect(mapStateToProps, {roundsToWin, players, numberOfPlayers})(CreateGame)
