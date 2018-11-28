import React, {Component} from 'react';

class JudgePlayerWaiting extends Component{
    constructor(){
        super();

        this.state = {

        }
    }
    render(){
        return(
            <div>
                {/* these h3's are subject to change with time. I'm not sure how we want these to conditionally render but we will figure that out later */}
                <h3>WAITING ON THE JUDGE.....</h3>
                <h3>WAITING ON PLAYERS.....</h3>
            </div>
        )
    }
}


export default JudgePlayerWaiting