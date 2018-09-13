var React = require('react');

class Dashboard extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

module.exports = Dashboard;
