import React, {Component} from 'react';

class Player extends Component{
    constructor(){
        super();
        //players array should contain objects containing the username, rounds_won, input_top, input_bottom, and role

        this.state = {
        }
    }
    topInput = (e) => {
        //players array passed from redux; player_index passed from parent component InGame
        this.props.players[this.props.player_index].input_top= e.target.value
    }
    bottomInput = (e) => {
        this.props.players[this.props.player_index].input_bottom = e.target.value
    }
    submitHandler = () => {

    }
    render(){
        return(
            <div>
                <div>
                    <img src = {}/>
                    <p>Text at Top: </p><input placeholder="Enter text here"/>
                    <p>Text at Bottom: </p><input placeholder="Enter text here"/>
                    <button>Submit Meme</button>
                </div>
            </div>
        )
    }
}




export default Player