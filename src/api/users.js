import axios from 'axios';

export const getUsers = () => {
  return axios.get('/users');
};

export const createUser = ({ firstName, lastName }) => {
  return axios.post('/users', { firstName, lastName });
}

export const updateUser = ({ userId, firstName, lastName }) => {
  return axios.put(`/users/${userId}`, { firstName, lastName });
}

export const deleteUser = (userId) => {
  return axios.delete(`/users/${userId}`);
}