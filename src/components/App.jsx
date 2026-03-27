import { connect } from 'react-redux';
import React, { Component } from 'react'

import { Alert } from 'reactstrap';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';
import { appStyles as styles } from './componentStyles';

import { usersError, getUsersRequest, createUserRequest, editUserRequest, deleteUserRequest } from '../actions/users';

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
  handleCloseAlert = () => {
    this.props.usersError('');
  }
  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId);
  };
  handleEditUserClick = ({ userId, firstName, lastName }) => {
    this.props.editUserRequest({ userId, firstName, lastName });
  };
  render() {
    const users = this.props.users;
    const UTC_ITERATOR = getUtcToIsoAppDisplay();
    return (
      <React.Fragment>
        <div style={styles.appContainer}>
          <Alert color="danger" isOpen={!!users.error} toggle={this.handleCloseAlert}>
            {users.error}
          </Alert>
          <p style={styles.utcDate}>
            Current UTC date: {UTC_ITERATOR.next().value}
          </p>
          <NewUserForm onSubmit={this.handleSubmit} />
          <UsersList users={users?.items} onEditUser={this.handleEditUserClick} onDeleteUser={this.handleDeleteUserClick} />
        </div>
      </React.Fragment>
    )
  }
}

export default connect(({ users }) => ({ users }), {
  usersError,
  editUserRequest,
  getUsersRequest,
  deleteUserRequest,
  createUserRequest
})(App)

