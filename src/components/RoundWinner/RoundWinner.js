import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RoundWinner.css';

class RoundWinner extends Component{
    constructor(props){
        super(props)

        this.state = {
            count: 7
        }
    }

    componentDidMount(){
        this.timer()
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

    render(){
        console.log(this.props.winningMeme)
        return (
            <div>
            {this.state.count > 0 ? 
                <div className='round-winner'>
                <h1 className='winning-user'>
                    {/* round winner will be a prop passed from the judge view */}
                    Round Winner is: {this.props.winningMeme}
                </h1>
                {this.state.count}
                <div className='round-winner'>
                    This is where the winning meme will display
                    {this.props.winningMeme}
                </div>
            </div> : this.props.history.push('/in-game')}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        winningMeme: state.winningMeme
    }
}

export default connect(mapStateToProps)(RoundWinner)