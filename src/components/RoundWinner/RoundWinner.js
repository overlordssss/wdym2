import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RoundWinner.css';

class RoundWinner extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return (
            <div className='round-winner'>
                <h1 className='winning-user'>
                    {/* round winner will be a prop passed from the judge view */}
                    Round Winner is: {this.props.user.username}
                </h1>
                <div className='round-winner'>
                    This is where the winning meme will display
                    {this.props.winningMeme}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        winningMeme: state.winningMeme
    }
}

export default connect(mapStateToProps)(RoundWinner)