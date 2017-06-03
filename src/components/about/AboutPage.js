import React from 'react';
import { Link, IndexLink } from 'react-router';
import { twitterFeedActions } from '../../actions/twitterFeedActions';
import { connect } from 'react-redux';
import io from 'socket.io-client';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    let uri = (process.env.NODE_ENV === 'production') ? 'http://localhost:80' : 'http://localhost:3030';
    this.socket = io(uri);
  }
  componentWillMount() {
    if (this.props.formState && Object.values(this.props.formState).every(x => x.length > 0) && this.props.loggedIn) {
      let self = this;
      self.socket.connect();
      // listen for tweets being emitted and when one is returned
      self.socket.on('tweet', function (data) {
        self.props.dispatch(twitterFeedActions(data));
      });
    }
  }
  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <div>
        <div className="nav nav-tabs about-page">
          <li className="nav-item"><Link to="/about/profile" className="nav-link" activeClassName="active">Profile</Link></li>
          <li className="nav-item"><Link to="/about/game" className="nav-link" activeClassName="active">Game</Link></li>
          <li className="nav-item"><Link to="/about/contact" className="nav-link" activeClassName="active">Contact</Link></li>
        </div>
        {this.props.children}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}
function mapStateToProps(state, ownProps) {
  return {
    formState: state.appData.formState || {},
    loggedIn: state.appData.loggedIn || {}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
