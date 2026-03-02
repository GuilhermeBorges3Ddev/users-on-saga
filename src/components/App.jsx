import { connect } from 'react-redux';
import React, { Component } from 'react'

import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

import { getUsersRequest, createUserRequest, deleteUserRequest } from '../actions/users';

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
    this.props.createUserRequest({ firstName, lastName });
  }
  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId);
  };
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
          <UsersList users={users?.items} onDeleteUser={this.handleDeleteUserClick} />
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  deleteUserRequest,
  createUserRequest
})(App)

