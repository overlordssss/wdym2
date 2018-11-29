import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Winner(){
    return(
        
        <div>
            <h1>
            {/* the h1 tag will take in the winner as a prop and display after the dash */}
                THE WINNER IS - 
            </h1>
            {/* the REPLAY WITH SAME PLAYERS BUTTON will take you straight into a new game passing along the other users as props on redux */}
            <Link to='/in-game'><button>REPLAY WITH SAME PLAYERS</button></Link>
            {/* the REPLAY WITH NEW PLAYERS will take you to the GameLoading View where other players will have the option to join and whoever is assigned as the room leader will have to start the game */}
            <Link to='/game-loading'><button>REPLAY WITH NEW PLAYERS</button></Link>
            {/* the HOME button will redirect the user back to the LandingPage Component */}
            <Link to='/landing-page'><button>HOME</button></Link>
        </div>
    )
}

export default connect()(Winner)