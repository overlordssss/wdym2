import React, {Component} from 'react';
import axios from 'axios'

class InGame extends Component{
    constructor(){
        super();

        this.state = {
            player_index: 0,
            username: ''
        }
    }
    componentDidMount () {
        //get user info, change username in state 
        //missing endpoint
        this.setState({username: res.data.username})
        //find user in players array and change index
        this.props.players.map((user, i) => {
            if (user.username === this.state.username) {this.setState({player_index: i}) }
        })
    }
    render(){

        //conditional rendering depending on role
        if(player_index === this.props.judgeIndex) {
            <Judge />
        } else {
            <Player />
        }
        return(
            <div>

            </div>
        )
    }
}