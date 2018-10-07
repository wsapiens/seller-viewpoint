import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button variant="raised" color="primary">
            Hello World
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
