import React, { useState } from 'react';
// Hooks from teacher API
import {
  useFetchTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} from '../services/teachersApi';

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

function TeachersPage() {
  const { data, error, isLoading } = useFetchTeachersQuery();

  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });
  const [editingTeacher, setEditingTeacher] = useState(null);

  // Extract teachers from the data response
  const teachers = data?.data || [];

  // Handle Create
  const handleCreateTeacher = async () => {
    try {
      await createTeacher(newTeacher).unwrap();
      setNewTeacher({ name: '', subject: '' });
    } catch (err) {
      console.error('Failed to create teacher:', err);
    }
  };

  // Handle Update
  const handleUpdateTeacher = async () => {
    try {
      await updateTeacher(editingTeacher).unwrap();
      setEditingTeacher(null);
    } catch (err) {
      console.error('Failed to update teacher:', err);
      const statusCode = err.response?.status;
      if (statusCode === 500) {
        alert('Server error: Please check your input and try again.');
      } else {
        alert(
          'Failed to update teacher: ' +
            (err.response?.data?.message || 'Unknown error')
        );
      }
    }
  };

  // Handle Delete
  const handleDeleteTeacher = async (id) => {
    try {
      await deleteTeacher(id).unwrap();
    } catch (err) {
      console.error('Failed to delete teacher:', err);
    }
  };

  // Error message
  if (isLoading) return <CircularProgress />;
  if (error) {
    console.error('Error fetching teachers:', error);
    return (
      <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
    );
  }

  // Handle input change
  const handleChange = (field, value) => {
    if (editingTeacher) {
      setEditingTeacher({ ...editingTeacher, [field]: value });
    } else {
      setNewTeacher({ ...newTeacher, [field]: value });
    }
  };

  return (
    <div className="app-component">
      <h1>{editingTeacher ? 'Edit Teacher' : 'Create Teacher'}</h1>
      {/* Form for the input field */}
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
          value={editingTeacher ? editingTeacher.name : newTeacher.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
        />
        <TextField
          label="Subject"
          variant="outlined"
          value={editingTeacher ? editingTeacher.subject : newTeacher.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={editingTeacher ? handleUpdateTeacher : handleCreateTeacher}
        >
          {editingTeacher ? 'Update Teacher' : 'Create Teacher'}
        </Button>
      </Box>

      <h1>Teachers Management</h1>
      {/* Table Container */}
      <TableContainer component={Paper}>
        {/* Table Header */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {Array.isArray(teachers) && teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher.teacher_id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    {new Date(teacher.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(teacher.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: 'flex',
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setEditingTeacher(teacher)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteTeacher(teacher.teacher_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No teachers available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TeachersPage;
