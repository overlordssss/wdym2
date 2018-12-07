import React, { Component } from 'react';
import './Reset.css';
import './App.css';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
