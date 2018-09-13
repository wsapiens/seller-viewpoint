var React = require('react');
var DefaultLayout = require('./layouts/default');

class Dashboard extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title} version={this.props.version}>
        <div>Hello {this.props.name}</div>
      </DefaultLayout>
    );
  }
}

module.exports = Dashboard;
