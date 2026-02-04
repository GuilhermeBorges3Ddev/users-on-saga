import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUsersRequest } from '../actions/users';

function* getUtcToIsoAppDisplay() {
  while (true) 
    yield new Date().toISOString().split('T')[0];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getUsersRequest();
  }
  render() {
    const UTC_ITERATOR = getUtcToIsoAppDisplay();
    return <div>{UTC_ITERATOR.next().value}</div>
  }
}

export default connect(null, {
  getUsersRequest
})(App)

