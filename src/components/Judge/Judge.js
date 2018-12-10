import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-responsive-carousel';

class Judge extends Component {
    constructor() {
        super();

        this.state = {
            meme_index: 0
        }
    }
    handleSwipeLeft = () => {
        let new_index = this.state.meme_index
        new_index++
        this.setState({ meme_index: new_index })
    }
    render() {
        const displayedText = this.props.players.map((player, index) => {
            let input_top = player.input_top;
            let input_bottom = player.input_bottom;
            return (
                <div className="meme_text">
                    {input_top}
                    {input_bottom}
                </div>
            )
        })
        return (
            <div>
                {/* shows only one players text at a time, and swipe will increment or decrement meme_index */}
                <p>{this.props.players[this.state.meme_index].input_top}</p>
                {/* <img src ={} /> */}
                <p>{this.props.players[this.state.meme_index].input_bottom}</p>
                <button>Select</button>
                <Carousel>
                    {displayedText}
                </Carousel>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players
    }
}



export default connect(mapStateToProps)(Judge)