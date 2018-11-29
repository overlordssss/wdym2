import React, {Component} from 'react';
import {connect} from 'react-redux';

class Judge extends Component{
    constructor(){
        super();

        this.state = {
            meme_index: 0
        }
    }
    handleSwipeLeft = () => {
        let new_index = this.state.meme_index
        new_index ++
        this.setState({meme_index: new_index})
    }
    render(){
        return(
            <div>
                {/* shows only one players text at a time, and swipe will increment or decrement meme_index */}
                <p>{this.props.players[this.state.meme_index].input_top}</p>
                {/* <img src ={} /> */}
                <p>{this.props.players[this.state.meme_index].input_bottom}</p>
                <button>Select</button> 
            </div>
        )
    }
}




export default connect()(Judge)