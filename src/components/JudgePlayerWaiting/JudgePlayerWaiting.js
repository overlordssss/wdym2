import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './JudgePlayerWaiting.css';
import {connect} from 'react-redux';

const particleOpt = {
    particles: {
      number:{
        value: 75,
        density:{
          enable: true,
          value_area: 800,
        }
      },
      color:{value: '#ffffff'}, 
      shape:{type: 'image',
        stroke:{width:0,color: '#000000'}, 
        polygon:{nb_sides:5},
        image:{src:"https://www.mememaker.net/api/bucket?path=static/img/memes/full/2017/Apr/27/18/no-just-no7.jpg","width":100,"height":100}},
        opacity:{
            value:0.5,
            random:false,
            anim:{enable:false,
                speed:5,
                opacity_min:0.1,
                sync:false}},
                size:{value:50,
                    random:true,
                    anim:{enable:false,
                        speed:40,size_min:0.1,sync:false}},
                        line_linked:{enable:false,
                            distance:150,
                            color:"#ffffff",
                            opacity:0.4,
                            width:1},
                            move:{enable:true,
                                speed:2,
                                direction:'none',
                                random:false,
                                straight:false,
                                out_mode:'out',
                                bounce:false,
                                attract:{"enable":false,
                                rotateX:600,
                                rotateY:1200}}},
                                interactivity:{detect_on:'canvas',events:{
                                    onhover:{enable:true,mode:'repulse'},
                                    onclick:{enable:true,
                                        mode:'push'},
                                        resize:true},
                                        modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,
                                            duration:2,
                                            opacity:8,
                                            speed:3},
                                            repulse:{"distance":200,duration:0.4},
                                            push:{particles_nb:4},remove:{particles_nb:2}}},
                                            retina_detect:true}
//     }
//   }


class JudgePlayerWaiting extends Component{
    render(){
        return(
            <div>
                <Particles params={particleOpt}/>
                {/* these h3's are subject to change with time. I'm not sure how we want these to conditionally render but we will figure that out later */}
                {this.props.players[this.props.judgeIndex] ?
                <div className='container'>
                    <h1 className='waiting'>WAITING ON PLAYERS</h1>
                    <div class="dash uno"></div>
                    <div class="dash dos"></div>
                    <div class="dash tres"></div>
                    <div class="dash cuatro"></div> 
                </div>
                : 
                <div className='container'>
                <h1 className='judge'>WAITING ON THE JUDGE</h1>
                <div class="dash uno"></div>
                <div class="dash dos"></div>
                <div class="dash tres"></div>
                <div class="dash cuatro"></div> 
                
            </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        players: state.players,
        judgeIndex: state.judgeIndex
    }
}


export default connect(mapStateToProps)(JudgePlayerWaiting)