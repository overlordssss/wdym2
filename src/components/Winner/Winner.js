import React from 'react';
import {Link} from 'react-router-dom'

export default function Winner(){
    return(
        <div>
            <h1>
                THE WINNER IS - 
            </h1>
            <Link to='/'><button>REPLAY WITH SAME PLAYERS</button></Link>
            <Link to='/game-loading'><button>REPLAY WITH NEW PLAYERS</button></Link>
            <Link to='/'><button>HOME</button></Link>
        </div>
    )
}