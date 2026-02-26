import { connect } from 'react-redux';
import React, { Component } from 'react'

import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

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
  handleSubmit = ({firstName, lastName}) => {
    console.log(firstName, lastName);
  }
  render() {
    const users = this.props.users;
    const UTC_ITERATOR = getUtcToIsoAppDisplay();
    return (
      <React.Fragment>
        <div style={{
          padding: "20px",
          margin: "0 auto",
          maxWidth: "600px",
        }}>
          <p style={{width: "100%"}}>
            Current UTC date: {UTC_ITERATOR.next().value}
          </p>
          <NewUserForm onSubmit={this.handleSubmit} />
          <UsersList users={users?.items} />
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest
})(App)

