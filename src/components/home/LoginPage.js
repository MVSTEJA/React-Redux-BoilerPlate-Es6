/*
 * LoginPage
 *
 * Users login on this page
 * Route: /login
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import auth from '../../utils/auth';
import { login } from '../../actions/appActions';
import LoadingIndicator from './../common/LoadingIndicator';

class LoginPage extends Component {
  constructor(props){
    super(props);
    this._login = this._login.bind(this);
  }
  _login(email, password) {
    this.props.dispatch(login(email, password));
  }
  render() {
    const dispatch = this.props.dispatch;
    const { formState, currentlySending, errorMessage } = this.props.data;
    return (
      <div className="form-page__wrapper">
        <div className="form-page__form-wrapper">
          <div className="form-page__form-header">
            <h2 className="form-page__form-heading">Login</h2>
          </div>
          {/* While the form is sending, show the loading indicator,
						otherwise show "Log in" on the submit button */}
          <Form data={formState} errorMessage={errorMessage} dispatch={dispatch} location={location} history={this.props.history} onSubmit={this._login} btnText={"Login"} currentlySending={currentlySending}/>
				</div>
      </div>
    );
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state.appData
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(LoginPage);
