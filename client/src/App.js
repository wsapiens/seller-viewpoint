import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from './logo.svg';
import './App.css';
import Login from './Login';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}


const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default App;
