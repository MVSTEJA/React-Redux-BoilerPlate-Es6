/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { logout } from '../../actions/appActions';
import LoadingButton from './LoadingButton';

class Nav extends Component {
  constructor(props) {
    super(props);
    this._logout = this._logout.bind(this);
  }
  _logout() {
    this.props.dispatch(logout());
  }
  render() {
    // Render either the Log In and register buttons, or the logout button
    // based on the current authentication state.
    const navButtons = this.props.loggedIn ? (
      <div>
        <Link to="/about" className="btn btn--login btn--nav" >About</Link>
        {this.props.currentlySending ? (
          <LoadingButton className="btn--nav" />
        ) : (
            <a href="javascript:void(0);" className="btn btn--login btn--nav" onClick={this._logout}>Logout</a>
          )}
      </div>
    ) : (
        <div>
          <Link to="/register" className="btn btn--login btn--nav">Register</Link>
          <Link to="/login" className="btn btn--login btn--nav">Login</Link>
        </div>
      );
    return (
      <div className="nav">
        <div className="nav__wrapper">
          <Link to="/" className="nav__logo-wrapper"><h1 className="nav__logo">DashBoard&nbsp;Admin</h1></Link>
          {navButtons}
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default Nav;
