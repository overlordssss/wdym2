import React from 'react';
import { connect } from 'react-redux';

function RoundWinner(props){
    return (
        <div className=''>
            <h1>
                {/* round winner will be a prop passed from the judge view */}
                Round Winner is: {props.user.username}
            </h1>
            <div>
                This is where the winning meme will display
                {props.winningMeme}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        user: state.user,
        winningMeme: state.winningMeme
    }
}

export default connect(mapStateToProps)(RoundWinner)