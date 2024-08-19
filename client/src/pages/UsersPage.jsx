import React, { useState } from 'react';
import {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../services/userApi';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Button,
  TextField,
  TableHead,
  CircularProgress,
} from '@mui/material';

function UsersPage() {
  const { data: users = [], error, isLoading } = useFetchUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = async () => {
    try {
      await createUser(newUser).unwrap();
      setNewUser({ name: '', email: '' });
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editingUser).unwrap();
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.error('Error fetching users:', error);
    return (
      <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
    );
  }

  return (
    <div>
      <h1>Users Management</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setEditingUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No users available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <TextField
        label="Name"
        value={editingUser ? editingUser.name : newUser.name}
        onChange={(e) =>
          editingUser
            ? setEditingUser({ ...editingUser, name: e.target.value })
            : setNewUser({ ...newUser, name: e.target.value })
        }
      />
      <TextField
        label="Email"
        value={editingUser ? editingUser.email : newUser.email}
        onChange={(e) =>
          editingUser
            ? setEditingUser({ ...editingUser, email: e.target.value })
            : setNewUser({ ...newUser, email: e.target.value })
        }
      />
      <Button
        variant="contained"
        color="primary"
        onClick={editingUser ? handleUpdateUser : handleCreateUser}
      >
        {editingUser ? 'Update User' : 'Create User'}
      </Button>
    </div>
  );
}

export default UsersPage;
