/*
 * RegisterPage
 *
 * Users login on this page
 * Route: /register
 *
 */

import React, { Component} from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { sendingRequest, register } from '../../actions/appActions';
import LoadingIndicator from './../common/LoadingIndicator';

class RegisterPage extends Component {
  constructor(props){
    super(props);
    this._register = this._register.bind(this);
  }
	// Register a user
	_register(email, password) {
		this.props.dispatch(register(email, password));
	}
	render() {
		const dispatch = this.props.dispatch;
		const { formState, currentlySending, errorMessage } = this.props.data;
    return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Register</h2>
					</div>
          <Form
            data={formState}
            errorMessage={errorMessage}
            dispatch={dispatch} location={location}
            history={this.props.history}
            onSubmit={this._register}
            btnText={"Register"}
            currentlySending={currentlySending}/>
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
export default connect(select)(RegisterPage);
