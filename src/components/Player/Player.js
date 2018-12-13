import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Player.css';
import Spinner from '../SpinnerComponent/Spinner';
import RoundWinner from '../RoundWinner/RoundWinner';

class Player extends Component{
    constructor(props){
        super(props);
        //players array should contain objects containing the username, rounds_won, input_top, input_bottom, and role

        this.state = {
            count: 60,
            inputTop: '',
            inputBottom: ''
        }
    }
    
    topInput = (e) => {
        this.setState({
            inputTop: e.target.value
        })
    }
    
    bottomInput = (e) => {
        this.setState({
            inputBottom: e.target.value
        })
    }
    
    submitHandler = () => {
        let {user, room} = this.props
        let {username} = user
        let {inputTop, inputBottom} = this.state
        console.log('inputs',inputTop, inputBottom)
        this.props.socket.emit('player submit', {username, inputTop, inputBottom, room})
        this.props.history.push('/waiting-room')
    }

    timer = () => {
        setInterval(() => {
                if(this.state.count > 0){
                this.setState({
                    count: this.state.count - 1
                })
            }}, 1000);
    }

    componentDidMount(){
        this.timer()
    }

    render(){        
        return(
            <div className='wallpaper'>
                <div className='timer-container'>
                <h1 className='counter'>{this.state.count}</h1>
                <div className='spinner'>
                {this.state.count > 0 ? <Spinner/>
                : this.props.history.push('/waiting-room')}
                </div>
                </div>
                <div className='meme'>
                    <div className='le-meme'>
                        <img src = 'http://www.comicsandmemes.com/wp-content/uploads/2013/04/Success-baby.jpg' alt='' className='user-meme'/>
                        <div className='input-top'>{this.state.inputTop}</div>
                        <div className='input-bottom'>{this.state.inputBottom}</div>
                    </div>
                    <div className='le-inputs'>
                        <h1>Text Top: </h1><input placeholder="Enter text here" className='inputs' onChange={this.topInput}/>
                        <h1>Text Bottom: </h1><input placeholder="Enter text here" className='inputs'onChange={this.bottomInput}/>
                        <button className='btn' onClick={this.submitHandler}>Submit Meme</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        players: state.players,
        user: state.user,
        room: state.room
    }
}


export default connect(mapStateToProps)(Player)