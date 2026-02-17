import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const UsersList = ({ users }) => {
  return (
   <ListGroup>
     {users.map(user => (
       <ListGroupItem key={user.id}>{user.firstName} {user.lastName}</ListGroupItem>
     ))}
   </ListGroup>
  );
};

export default UsersList;