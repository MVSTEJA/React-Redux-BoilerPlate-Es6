import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const ContactPage = (props) => <div className="jumbotron admin-dashboard">
  <h1>Contact Page</h1>
  <p>My Contact Details are :</p>
  <p>Email :- {props.data.email}</p>
</div>;


// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state.appData.formState
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ContactPage);
