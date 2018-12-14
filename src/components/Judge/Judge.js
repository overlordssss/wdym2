import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../SpinnerComponent/Spinner';
import { winningMeme, memes } from '../../dux/reducer';
import Carousel from 'react-responsive-carousel';

class Judge extends Component {
    constructor() {
        super();

        this.state = {
            meme_index: 0,
            count: 60,
            currentIndex: 0,
            playerData: []
        }
    }

    componentDidMount() {
        this.timer()
    }

    handleSwipeLeft = () => {
        let new_index = this.state.meme_index
        new_index++
        this.setState({ meme_index: new_index })
    }

    timer = () => {
        setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: this.state.count - 1
                })
            }
        }, 1000);
    }

    memeSelect = (val) => {
        this.props.winningMeme(val)
    }

    render() {
        console.log('playerdata: ', this.state.playerData)
        let playerMemes = this.state.playerData.map((player, i) => {
            let top = this.state.playerData[i].inputTop;
            let bottom = this.state.playerData[i].inputBottom;

            return (
                <div>
                    <p>{top}</p>
                    <p>{bottom}</p>
                </div>
            )
        })
        return (
            <div>
                <div className='counter'>
                    <h1>{this.state.count}</h1>
                </div>
                <div className='spinner'>
                    {this.state.count > 0 ? <Spinner />
                        : this.props.history.push('/round-winner')}
                </div>
                {/* shows only one players text at a time, and swipe will increment or decrement meme_index */}
                {/* <p>{this.props.players[this.state.meme_index].input_top}</p> */}
                {/* <img src ={} /> */}
                {/* <p>{this.props.players[this.state.meme_index].input_bottom}</p> */}
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    swipable={true}
                >
                    {playerMemes}

                </Carousel>
                <button onClick={this.memeSelect}>Select</button>
                {}
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        players: state.players
    }
}



export default connect(mapStateToProps, { winningMeme, memes })(Judge)