import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Player.css';
import Spinner from '../SpinnerComponent/Spinner';
import RoundWinner from '../RoundWinner/RoundWinner';

class Player extends Component {
    constructor(props) {
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
        let { user, room } = this.props
        let { username } = user
        let { inputTop, inputBottom } = this.state
        console.log('inputs', inputTop, inputBottom)
        this.props.socket.emit('player submit', { username, inputTop, inputBottom, room })
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


    render() {
        console.log(this.props)
        return (
            <div className='wallpaper'>
                <div className='meme'>
                    <div className='le-meme'>
                        <div></div>
                        <img src='https://www.lovequotesmessages.com/wp-content/uploads/2018/04/agent_skeleton_still_waiting_meme1.jpg' alt='' className='user-meme' />
                        <div className='meme-inputs'>
                            <p className='input-top'>{this.state.inputTop}</p>
                            <p className='input-bottom'>{this.state.inputBottom}</p>
                        </div>
                    </div>
                    <div className='inputs-timer-container'>
                        <div className='le-inputs'>
                            <h1>Text Top: </h1><input placeholder="Enter text here" className='inputs' onChange={this.topInput} />
                            <h1>Text Bottom: </h1><input placeholder="Enter text here" className='inputs' onChange={this.bottomInput} />
                            <button className='btn' onClick={this.submitHandler}>Submit Meme</button>
                        </div>
                        <div className='timer-container'>
                            <h1 className='counter'>{this.state.count}</h1>
                            <div className='spinner'>
                                {this.state.count > 0 ? <Spinner />
                                    : this.props.history.push('/waiting-room')}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players,
        user: state.user,
        room: state.room
    }
}


export default connect(mapStateToProps)(Player)