import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Particles from 'react-particles-js'

const particleOpt = {
    particles: {
        number: {
            value: 75,
            density: {
                enable: true,
                value_area: 800,
            }
        },
        color: { value: '#ffffff' },
        shape: {
            type: 'image',
            stroke: { width: 0, color: '#000000' },
            polygon: { nb_sides: 5 },
            image: { src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VPFzSsixMK0CM-yRzCJL2_jD0_uPa1q2WsobcfAZ5FnCoNax', "width": 100, "height": 100 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 5,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 75,
            random: true,
            anim: {
                enable: false,
                speed: 40, size_min: 0.1, sync: false
            }
        },
        line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                "enable": false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas', events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: {
                distance: 400, size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: { "distance": 200, duration: 0.4 },
            push: { particles_nb: 4 }, remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
}

class Winner extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (

            <div>
                <Particles params={particleOpt} />
                <div className='container two'>
                    <h1>
                        {/* the h1 tag will take in the winner as a prop and display after the dash */}
                        THE WINNER IS - {this.props.winningMeme.username}
                    </h1>
                    <Link to='/landing-page'><button className='btn'>HOME</button></Link>
                </div>
                {/* the REPLAY WITH SAME PLAYERS BUTTON will take you straight into a new game passing along the other users as props on redux */}
                {/* <Link to='/in-game'><button>REPLAY WITH SAME PLAYERS</button></Link> */}
                {/* the REPLAY WITH NEW PLAYERS will take you to the GameLoading View where other players will have the option to join and whoever is assigned as the room leader will have to start the game */}
                {/* <Link to='/game-loading'><button>REPLAY WITH NEW PLAYERS</button></Link> */}
                {/* the HOME button will redirect the user back to the LandingPage Component */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        winningMeme: state.winningMeme
    }
}

export default connect(mapStateToProps)(Winner)