import React, { useState } from 'react';
import {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../services/usersApi';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Button,
  CircularProgress,
  TableHead,
} from '@mui/material';
import SearchFilter from '../components/common/SearchFilter';
import UserForm from '../components/common/UserForm';

function UsersPage() {
  const { data, error, isLoading } = useFetchUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '', // Ensure this matches the available options
    password: '',
    subject: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [filters, setFilters] = useState({});

  const users = data?.data || [];

  const filteredUsers = users
    .filter((user) => {
      return Object.keys(filters).every((key) =>
        user[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
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

  const handleCreateOrUpdateUser = async () => {
    try {
      const userToSubmit = editingUser || newUser;

      // Ensure role value matches one of the available options
      if (
        !['Admin', 'Teacher', 'Student', 'Parent'].includes(userToSubmit.role)
      ) {
        alert('Invalid role selected');
        return;
      }

      if (userToSubmit.role !== 'Teacher') {
        delete userToSubmit.subject;
      }

      if (editingUser) {
        await updateUser(userToSubmit).unwrap();
        setEditingUser(null);
      } else {
        await createUser(userToSubmit).unwrap();
        setNewUser({
          name: '',
          email: '',
          role: '', // Reset role to empty string
          password: '',
          subject: '',
        });
      }
    } catch (err) {
      console.error('Failed to submit user:', err);
      alert('Error submitting user. Please check the required fields.');
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
      <UserForm
        user={editingUser || newUser}
        isEditing={!!editingUser}
        onChange={handleChange}
        onSubmit={handleCreateOrUpdateUser}
      />

      <h1>Users Management</h1>

      <SearchFilter filters={filters} onFilterChange={handleFilterChange} />

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
