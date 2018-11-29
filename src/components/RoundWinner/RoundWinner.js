import React from 'react';
import { connect } from 'react-redux';

function RoundWinner(){
    return (
        <div>
            <h1>
                {/* round winner will be a prop passed from the judge view */}
                Round Winner is: {}
            </h1>
            <div>
                This is where the winning meme will display
            </div>
        </div>
    )
}

export default connect()(RoundWinner)