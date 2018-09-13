var React = require('react');

class LoginView extends React.Component {
  render() {
    return (
      <div class="container">
        <h1>Sign In</h1>
        <form method="post" action="/login">
          <p>
            <label>Username:</label>
            <input type="text" name="username" />
          </p>
          <p>
            <label>Password:</label>
            <input type="password" name="password" />
          </p>
          <p>
            <input type="submit" value="Login" />
          </p>
        </form>
        <div align="center">
          <p><font color="red">{this.props.message}</font></p>
        </div>
        <a href="/subscribe">Create Account For your company</a>
      </div>
    );
  }
}

module.exports = LoginView;
