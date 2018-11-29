import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './JudgePlayerWaiting.css';

const particleOpt = {
    particles: {
      number:{
        value: 75,
        density:{
          enable: true,
          value_area: 800,
        }
      },
    }
  }


class JudgePlayerWaiting extends Component{
    render(){
        return(
            <div>
                <Particles params={particleOpt}/>
                {/* these h3's are subject to change with time. I'm not sure how we want these to conditionally render but we will figure that out later */}
                <h3>WAITING ON THE JUDGE.....</h3>
                <h3>WAITING ON PLAYERS.....</h3>
            </div>
        )
    }
}


export default JudgePlayerWaiting