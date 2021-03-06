import React, { Component } from 'react';
import './Reset.css';
import './App.css';
import routes from './routes';
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_SOCKET)

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes(socket)}
      </div>
    );
  }
}

export default App;
