import React, { useState } from 'react';
import {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../services/usersApi';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Button,
  CircularProgress,
  TextField,
  TableHead,
  MenuItem,
  Select,
} from '@mui/material';
import FilterComponent from '../components/common/FilterComponent';

function UsersPage() {
  const { data, error, isLoading } = useFetchUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    subject: '', // Specific field for teachers
  });
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({});

  const users = data?.data || [];

  const filteredUsers = users
    .filter((user) => {
      return Object.keys(filters).every((key) =>
        user[key].toString().toLowerCase().includes(filters[key].toLowerCase())
      );
    })
    .sort((a, b) => {
      if (a.user_id === 1) return -1;
      if (b.user_id === 1) return 1;
      return a.user_id - b.user_id;
    });

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const handleChange = (field, value) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [field]: value });
    } else {
      setNewUser({ ...newUser, [field]: value });
    }
  };

  const handleCreateUser = async () => {
    try {
      const userToCreate = { ...newUser };

      if (userToCreate.role !== 'Teacher') {
        delete userToCreate.subject; // Remove subject if the role is not Teacher
      }

      await createUser(userToCreate).unwrap();
      setNewUser({ name: '', email: '', role: '', password: '', subject: '' });
    } catch (err) {
      console.error('Failed to create user:', err);
      alert('Error creating user. Please check the required fields.');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const userToUpdate = { ...editingUser };

      if (userToUpdate.role !== 'Teacher') {
        delete userToUpdate.subject; // Remove subject if the role is not Teacher
      }

      await updateUser(userToUpdate).unwrap();
      setEditingUser(null);
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Error updating user. Please check the required fields.');
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
    <div className="app-component">
      <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          margin: 'auto',
          padding: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
          fullWidth
        />
        <Select
          label="Role"
          value={editingUser ? editingUser.role : newUser.role}
          onChange={(e) => handleChange('role', e.target.value)}
          fullWidth
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Parent">Parent</MenuItem>
        </Select>
        {((editingUser && editingUser.role === 'Teacher') ||
          (!editingUser && newUser.role === 'Teacher')) && (
          <TextField
            label="Subject"
            variant="outlined"
            value={editingUser ? editingUser.subject : newUser.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            fullWidth
          />
        )}
        {!editingUser && (
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={newUser.password}
            onChange={(e) => handleChange('password', e.target.value)}
            fullWidth
          />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={editingUser ? handleUpdateUser : handleCreateUser}
        >
          {editingUser ? 'Update User' : 'Create User'}
        </Button>
      </Box>

      <h1>Users Management</h1>

      <FilterComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        fields={[
          { name: 'user_id', label: 'Filter by ID' },
          { name: 'name', label: 'Filter by Name' },
        ]}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              {filteredUsers.some((user) => user.role === 'Teacher') && (
                <TableCell>Subject</TableCell>
              )}
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  {user.role === 'Teacher' && (
                    <TableCell>{user.subject}</TableCell>
                  )}
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ display: 'flex', gap: 1 }}>
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
                      onClick={() => handleDeleteUser(user.user_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No users available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersPage;
