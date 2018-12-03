import React, {Component} from 'react';
import {connect} from 'react-redux';
import {roundsToWin, players} from '../../dux/reducer'

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
        this.setState({ numberOfPlayers: amountOfPlayers })
    }
    handleRoundInput = (e) => {
        let roundInput = e.target.value
        this.setState({ roundsForWin: roundInput })
    }
    handleSubmit = () => {
        let newArr = []
        newArr.push({username: this.state.playerUsername, rounds_won: 0, input_top: '', input_bottom: '', role: ''})
        //fill newArr with objects, up to maxPlayer
        newArr.fill({username: '', rounds_won: 0, input_top: '', input_bottom: '', role: ''}, 1, this.state.numberOfPlayers-1)
        this.props.players(newArr)
        this.props.roundsToWin(this.state.roundsForWin)
    }
    render() {
        return (
            <div>
                <p>Max number of Players</p>
                <input type='number' onChange={this.handlePlayerInput} /><p>(Min 3; Max 10)</p>
                <p>Rounds to win</p>
                <input type='number' /><p>(Max 10></p>
                <p>Custom images</p>
                <button>Submit</button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    
}

<<<<<<< HEAD
export default connect(mapStateToProps, {roundsToWin})(CreateGame)
=======

export default connect()(CreateGame)
>>>>>>> master
