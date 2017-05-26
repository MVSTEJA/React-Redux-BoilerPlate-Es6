// This component handles the App template used on every page.
import React, { PropTypes } from 'react';
import Nav from './common/Nav';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav
          loggedIn={this.props.data.loggedIn} history={this.props.history} location={this.props.location} dispatch={this.props.dispatch} currentlySending={this.props.data.currentlySending}
          loading={this.props.loading}
        />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    data: state.appData
  };
}

export default connect(mapStateToProps)(App);
