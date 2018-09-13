var React = require('react');
var Header = require('./header');
var Footer = require('./footer');

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <Header>{this.props.version}</Header>
          {this.props.children}
          <Footer></Footer>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
