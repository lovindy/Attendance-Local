import { useState } from 'react';
import {
  useFetchAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} from '../../services/adminsApi';
import UserForm from '../../components/common/UserForm';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Button,
  TableHead,
  CircularProgress,
} from '@mui/material';

function AdminsPage() {
  const { data, error, isLoading } = useFetchAdminsQuery();
  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const admins = data?.data || [];

  const handleFormChange = (field, value) => {
    setSelectedAdmin((prevAdmin) => ({
      ...prevAdmin,
      [field]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (isEditing) {
      try {
        await updateAdmin(selectedAdmin).unwrap();
        setIsEditing(false);
        setSelectedAdmin(null);
      } catch (err) {
        console.error('Failed to update admin:', err);
        alert('Error updating admin. Please check the required fields.');
      }
    } else {
      try {
        await createAdmin(selectedAdmin).unwrap();
        setSelectedAdmin(null);
      } catch (err) {
        console.error('Failed to create admin:', err);
        alert('Error creating admin. Please check the required fields.');
      }
    }
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setIsEditing(true);
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await deleteAdmin(id).unwrap();
    } catch (err) {
      console.error('Failed to delete admin:', err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.error('Error fetching admins:', error);
    return (
      <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
    );
  }

  return (
    <div className="app-component">
      <h2>{isEditing ? 'Edit Admin' : 'Add Admin'}</h2>
      {selectedAdmin && (
        <UserForm
          user={selectedAdmin}
          isEditing={isEditing}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />
      )}

      <h1>Admins Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.length > 0 ? (
              admins.map((admin) => (
                <TableRow key={admin.admin_id}>
                  <TableCell>{admin.admin_id}</TableCell>
                  <TableCell>{admin.User?.name || 'N/A'}</TableCell>
                  <TableCell>{admin.User?.email || 'N/A'}</TableCell>
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
                      onClick={() => handleEditAdmin(admin)}
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
                <TableCell colSpan={7}>No admins available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminsPage;
