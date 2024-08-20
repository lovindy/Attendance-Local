import { useState } from 'react';

import {
  useFetchAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from '../services/adminsApi';

import {
  Box,
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

function AdminsPage() {
  const { data, error, isLoading } = useFetchAdminsQuery();
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    user_id: '',
  });
  const [editingAdmin, setEditingAdmin] = useState(null);

  const admins = data?.data || [];

  const handleChange = (field, value) => {
    if (editingAdmin) {
      setEditingAdmin({ ...editingAdmin, [field]: value });
    } else {
      setNewAdmin({ ...newAdmin, [field]: value });
    }
  };

  const handleCreateAdmin = async () => {
    try {
      await createAdmin(newAdmin).unwrap();
      setNewAdmin({ name: '', email: '', user_id: '' });
    } catch (err) {
      console.error('Failed to create user:', err);
      alert('Error creating user. Please check the required fields.');
    }
  };

  const handleUpdateAdmin = async () => {
    try {
      await updateAdmin(editingAdmin).unwrap();
      setEditingAdmin(null);
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Error updating user. Please check the required fields.');
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id).unwrap();
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
      <h2>{editingAdmin ? 'Edit Admin' : 'Add Admin'}</h2>
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
          value={editingAdmin ? editingAdmin.name : newAdmin.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={editingAdmin ? editingAdmin.email : newAdmin.email}
          onChange={(e) => handleChange('email', e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={editingAdmin ? handleUpdateAdmin : handleCreateAdmin}
        >
          {editingAdmin ? 'Update Admin' : 'Create Admin'}
        </Button>
      </Box>

      <h1>Admins Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User_ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data?.data) && data.data.length > 0 ? (
              data.data.map((admin) => (
                <TableRow key={admin.admin_id}>
                  <TableCell>{admin.admin_id}</TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.user_id}</TableCell>
                  <TableCell>
                    {new Date(admin.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(admin.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setEditingAdmin(admin)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteAdmin(admin.admin_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>No admins available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminsPage;
