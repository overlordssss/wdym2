import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../SpinnerComponent/Spinner';
import { winningMeme } from '../../dux/reducer';

class Judge extends Component {
    constructor() {
        super();

        this.state = {
            meme_index: 0,
            count: 60,
            playerData: []
        }
    }

    componentDidMount(){
        this.props.socket.on('get responses', (data) => {
            this.setState({
                playerData: data
            })
        })
    }

    handleSwipeLeft = () => {
        let new_index = this.state.meme_index
        new_index++
        this.setState({ meme_index: new_index })
    }

    timer = (val) => {
        if (val > 0) {
            setTimeout(() => {
                this.setState({
                    count: this.state.count - 1
                })
            }, 1000);
        }
    }

    memeSelect = (val) => {
        this.props.winningMeme(val)
    }

    render() {
        const displayedText = this.state.playerData.map((player, index) => {
            let input_top = this.state.playerData.input_top;
            let input_bottom = this.state.playerData.input_bottom;
            return (
                <div className="meme_text">
                    {input_top}
                    {input_bottom}
                </div>
            )
        })
        return (
            <div>
                <div className='counter'>
                    {this.timer(this.state.count)}
                    <h1>{this.state.count}</h1>
                </div>
                <div className='spinner'>
                    {this.state.count > 0 ? ''
                        : this.props.history.push('/round-winner')}
                </div>
                {/* shows only one players text at a time, and swipe will increment or decrement meme_index */}
                {/* <p>{this.props.players[this.state.meme_index].input_top}</p> */}
                {/* <img src ={} /> */}
                {/* <p>{this.props.players[this.state.meme_index].input_bottom}</p> */}
                <button onClick={this.memeSelect}>Select</button>
                {}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players
    }
}



export default connect(mapStateToProps, { winningMeme })(Judge)