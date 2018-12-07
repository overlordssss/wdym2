import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Player.css';
import Spinner from '../SpinnerComponent/Spinner';
import RoundWinner from '../RoundWinner/RoundWinner';

class Player extends Component{
    constructor(){
        super();
        //players array should contain objects containing the username, rounds_won, input_top, input_bottom, and role

        this.state = {
            count: 60
        }
    }
    
    topInput = (e) => {
        //players array passed from redux; player_index passed from parent component InGame
        
    }
    
    bottomInput = (e) => {
        
    }
    
    submitHandler = () => {

    }

    timer = (val) => {
        if(val > 0){
            setTimeout(() => {
                this.setState({
                    count: this.state.count - 1
                })
            }, 1000);
        }
    }

    render(){
        
        
        return(
            <div >
                <div className='timer-container'>
                {this.timer(this.state.count)}
                <h1 className='counter'>{this.state.count}</h1>
                <div className='spinner'>
                {this.state.count > 1 ? <Spinner/>
                : <RoundWinner />}
                </div>
                </div>
                <div className='meme'>
                    <img src = 'https://quizizz.zendesk.com/hc/article_attachments/115002501069/1024x1024.jpg' className='user-meme'/>
                    <p>Text at Top: </p><input placeholder="Enter text here" />
                    <p>Text at Bottom: </p><input placeholder="Enter text here"/>
                    <Link to='/waiting-room'><button>Submit Meme</button></Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        players: state.players
    }
}


export default connect(mapStateToProps)(Player)