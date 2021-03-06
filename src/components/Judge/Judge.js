import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../SpinnerComponent/Spinner';
import { memeWinner } from '../../dux/reducer';
import './Judge.css';

class Judge extends Component {
   constructor() {
       super();

       this.state = {
           meme_index: 0,
           memes: [],
           count: 10000,
           playerData: []
       }
   }

   componentDidMount() {
       this.timer()

        this.props.socket.on('round winner', data => {
            this.props.memeWinner(data.roundWinner)
            this.props.history.push('/round-winner')
        })
        
    }

   handleClickLeft = () => {
       let new_index = 0
       if (this.state.meme_index === 0) {
           new_index = this.props.playerData.length - 1
       } else {
           new_index = this.state.meme_index - 1
       }
       this.setState({ meme_index: new_index })
   }

   handleClickRight = () => {
       let new_index = 0
       if (this.state.meme_index === this.props.playerData.length -1) {
           new_index = 0
       } else {
           new_index = this.state.meme_index + 1
       }
       this.setState({ meme_index: new_index })
   }

   timer = () => {
       setInterval(() => {
           if (this.state.count > 0) {
               this.setState({
                   count: this.state.count - 1
               })
           }
       }, 1000);
   }

    memeSelect = () => {
        //send winning meme and username to sockets
        let roundWinner = this.props.playerData[this.state.meme_index]
        let { room } = this.props
        console.log('roundWinner: ', roundWinner)
        this.props.socket.emit('judge select', { roundWinner, room })
    }

    render() {
        console.log('playerdata: ', this.props.playerData)
        return (
            <div className='judge-container'>
                <div className='judge-timer-container'>
                    <div className='judge-timer'>
                        <h1>{this.state.count}</h1>
                    </div>
                    <div className='judge-spinner'>
                        {this.state.count > 0 ? <Spinner />
                            : this.memeSelect()}
                    </div>
                </div>
                <div className='arrow-container'>
                    <div className="arrow-left" onClick={this.handleClickLeft}></div>
                    <div className='le-meme'>
                        <img src={`${this.props.memes[this.props.round].url}`} alt='' className='user-meme' />
                        <div className='meme-inputs'>
                            <p className='input-top'>{this.props.playerData[this.state.meme_index].inputTop}</p>
                            <p className='input-bottom'>{this.props.playerData[this.state.meme_index].inputBottom}</p>
                        </div>
                    </div>
                    <div className="arrow-right" onClick={this.handleClickRight}></div>
                </div>
                <button className='btn' onClick={this.memeSelect}>Select</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
   return {
       players: state.players,
       playerData: state.playerData,
       room: state.room,
       memes: state.memes,
       round: state.round
   }
}



export default connect(mapStateToProps, { memeWinner })(Judge)
