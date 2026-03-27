import React, { Component } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { usersListStyles as styles } from "./componentStyles";

class UsersList extends Component {
  state = {
    isOnEditMode: false,
    editedUser: { userId: null, firstName: "", lastName: "" },
  };

  handleFirstNameChange = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      editedUser: { ...prevState.editedUser, firstName: value },
    }));
  };

  handleLastNameChange = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      editedUser: { ...prevState.editedUser, lastName: value },
    }));
  };

  resetEditMode = () => {
    this.setState({
      isOnEditMode: false,
      editedUser: { userId: null, firstName: "", lastName: "" },
    });
  };

  handleEditButtonClick = (user) => {
    const { isOnEditMode } = this.state;
    if (isOnEditMode) {
      this.resetEditMode();
      return;
    }

    this.setState({
      isOnEditMode: true,
      editedUser: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  };

  handleSaveClick = () => {
    const { onEditUser } = this.props;
    onEditUser(this.state.editedUser);
    this.resetEditMode();
  };

  displayEditModeLayout = (user) => {
    const { isOnEditMode, editedUser } = this.state;
    const isEditModeEnabled = isOnEditMode && editedUser.userId === user.id;
    if (isEditModeEnabled) {
      return (
        <section style={styles.editModeSection}>
          <input
            placeholder="First name"
            onChange={this.handleFirstNameChange}
            value={editedUser.firstName}
            style={styles.editInput}
          />
          <input
            placeholder="Last name"
            onChange={this.handleLastNameChange}
            value={editedUser.lastName}
            style={styles.editInput}
          />
          <Button
            outline
            color="success"
            onClick={this.handleSaveClick}
            style={styles.saveButton}
          >
            Save
          </Button>
        </section>
      );
    }

    return (
      <section style={styles.userNameSection}>
        {user.firstName} {user.lastName}
      </section>
    );
  };

  render() {
    const { users = [], onDeleteUser } = this.props;
    const { isOnEditMode, editedUser } = this.state;

    return (
      <ListGroup>
        {[...users]
          .sort((a, b) => {
            if (a.firstName > b.firstName) {
              return 1;
            } else if (a.firstName < b.firstName) {
              return -1;
            } else if (a.lastName > b.lastName) {
              return 1;
            } else if (a.lastName < b.lastName) {
              return -1;
            }

            return 0;
          })
          .map((user) => {
            return (
              <ListGroupItem key={user.id}>
                <section style={styles.listRow}>
                  <div style={styles.userNameContainer}>
                    {this.displayEditModeLayout(user)}
                  </div>
                  <div style={styles.actionsContainer}>
                    <Button
                      outline
                      color="warning"
                      onClick={() => this.handleEditButtonClick(user)}
                      style={styles.editButton}
                    >
                      {isOnEditMode && editedUser.userId === user.id ? "Cancel edition" : "Edit"}
                    </Button>
                    {!isOnEditMode && (
                      <Button
                        outline
                        color="danger"
                        onClick={() => onDeleteUser(user.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </section>
              </ListGroupItem>
            );
          })}
      </ListGroup>
    );
  }
}

export default UsersList;