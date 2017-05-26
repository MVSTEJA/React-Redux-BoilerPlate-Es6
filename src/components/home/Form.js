/**
 * Form.js
 *
 * The form with a email and a password input field, both of which are
 * controlled via the application state.
 *
 */

import React, { Component } from 'react';
import { changeForm } from './../../actions/appActions';
import LoadingButton from './../common/LoadingButton';
import ErrorMessage from './../common/ErrorMessage';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._changeEmail = this._changeEmail.bind(this);
    this._changePassword = this._changePassword.bind(this);
  }// Change the email in the app state
  _changeEmail(evt) {
    let newState = this._mergeWithCurrentState({
      email: evt.target.value
    });

    this._emitChange(newState);
  }

  // Change the password in the app state
  _changePassword(evt) {
    let newState = this._mergeWithCurrentState({
      password: evt.target.value
    });

    this._emitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign({}, this.props.data, change);
  }

  // Emits a change of the form state to the application state
  _emitChange(newState) {
    this.props.dispatch(changeForm(newState));
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.data.email, this.props.data.password);
  }
  render() {
    console.log(this.props);
    return (
      <form className="form" onSubmit={this._onSubmit}>
        <ErrorMessage errorMessage={this.props.errorMessage}/>
        <div className="form__field-wrapper">
          <input className="form__field-input" id="user email" value={this.props.data.email} placeholder="Email" onChange={this._changeEmail} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" type="email" name="email" autoComplete="off"/>
          <label className="form__field-label" htmlFor="email">Email</label>
        </div>
        <div className="form__field-wrapper">
          <input className="form__field-input" id="password" type="password" value={this.props.data.password} placeholder="••••••••••" onChange={this._changePassword} autoComplete="off"/>
          <label className="form__field-label" htmlFor="password">Password</label>
        </div>
        <div className="form__submit-btn-wrapper">
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
              <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
            )}
        </div>
      </form>
    );
  }


}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  btnText: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired
}

export default LoginForm;
