var React = require('react');

class Header extends React.Component {
  render() {
    return (
      <div data-role="header" data-position="fixed" data-theme="a">
        <h1>Seller Viewpoint v{this.props.children}</h1>
        <a href="#nav-panel" data-icon="bars" data-iconpos="notext">Menu</a>
        <a href="#config-form" data-icon="gear" data-iconpos="notext">Config</a>
      </div>
    );
  }
}

module.exports = Header;
