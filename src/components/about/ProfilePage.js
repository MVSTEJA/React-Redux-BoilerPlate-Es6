import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const ProfilePage = (props) => (<div className="jumbotron admin-dashboard">
  <h1>Twitter Feed Page</h1>
  <p>Live Feed about Champion's Trophy 2017, England</p>
  <div className="profile-page">
    {props.tweets.map((tweet, index) =>
      <p key={index}>{tweet}</p>
    )}
  </div>
</div>);

function mapStateToProps(state, ownProps) {
  return {
    tweets: state.appData.tweets
  };
}

export default connect(mapStateToProps)(ProfilePage);
