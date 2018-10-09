import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <form method="post" action="/login">
          <p>
            <label>Username: </label>
            <Input type="text" name="username" />
          </p>
          <p>
            <label>Password: </label>
            <Input type="password" name="password" />
          </p>
          <p>
            <Button variant="raised" color="primary" type="submit">Log In</Button>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
