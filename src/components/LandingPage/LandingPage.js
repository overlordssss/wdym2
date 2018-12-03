import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LandingPage extends Component {
    constructor() {
        super()

        this.state = {
            userType: false,
            roomCode: '',
            guestUsername: ''
        }
    }
    // skeleton method for loging out. will just route the user to the login page and destroy the session
    logout = () => {

    }
    // basic method for handling any user inputs on this view
    handleInputs = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.username.username ?
                    <h1>Welcome {this.props.username.username}! </h1>
                    : <h1>Welcome {this.props.guest}! </h1>}
                <Link to='/create-game'><button
                // onClick={}
                >Create new game</button></Link>
                <h3>Enter Room code to join an existing game</h3>
                <input
                    type='text'
                    value={this.state.roomCode}
                    placeholder='Room Code'
                    onChange={this.handleInputs}
                />
                <Link to='/game-loading'><button>Join</button></Link>
                <div>
                    <Link to='/'>Logout</Link>
                    <Link to='/register'>Create an account</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        guest: state.guestUsername
    }
}


export default connect(mapStateToProps)(LandingPage)