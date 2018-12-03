import React from 'react';
import { connect } from 'react-redux';

function RoundWinner(){
    return (
        <div>
            <h1>
                {/* round winner will be a prop passed from the judge view */}
                Round Winner is: {this.props.username}
            </h1>
            <div>
                This is where the winning meme will display
                {this.props.winningMeme}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        username: state.username,
        winningMeme: state.winningMeme
    }
}

export default connect(mapStateToProps)(RoundWinner)