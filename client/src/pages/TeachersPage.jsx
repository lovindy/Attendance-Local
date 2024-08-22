import React, { useState } from 'react';
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
import FilterComponent from '../components/common/FilterComponent';

function TeachersPage() {
  const { data, error, isLoading } = useFetchTeachersQuery();
  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    user_id: '',
  });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [filters, setFilters] = useState({});

  // Extract teachers from the data response
  const teachers = data?.data || [];

  // Filter and sort teachers
  const filteredTeachers = teachers
    .filter((teacher) => {
      return Object.keys(filters).every((key) =>
        teacher[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase())
      );
    })
    .sort((a, b) => a.teacher_id - b.teacher_id); // Adjust sorting if needed

  // Handle input change
  const handleChange = (field, value) => {
    if (editingTeacher) {
      setEditingTeacher({ ...editingTeacher, [field]: value });
    } else {
      setNewTeacher({ ...newTeacher, [field]: value });
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const handleCreateTeacher = async () => {
    try {
      await createTeacher(newTeacher).unwrap();
      setNewTeacher({ name: '', subject: '', user_id: '' });
    } catch (err) {
      console.error('Failed to create teacher:', err);
    }
  };

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

  const handleDeleteTeacher = async (id) => {
    try {
      await deleteTeacher(id).unwrap();
    } catch (err) {
      console.error('Failed to delete teacher:', err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.error('Error fetching teachers:', error);
    return (
      <div>Error: {error.data?.message || 'An unknown error occurred'}</div>
    );
  }

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
          label="User ID"
          variant="outlined"
          value={editingTeacher ? editingTeacher.user_id : newTeacher.user_id}
          onChange={(e) => handleChange('user_id', e.target.value)}
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

      {/* Reusable Filter Component */}
      <FilterComponent
        filters={filters}
        onFilterChange={handleFilterChange}
        fields={[
          { name: 'name', label: 'Filter by Name' },
          { name: 'subject', label: 'Filter by Subject' },
        ]}
      />

      <h1>Teachers Management</h1>
      {/* Table Container */}
      <TableContainer component={Paper}>
        {/* Table Header */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {Array.isArray(filteredTeachers) && filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.teacher_id}>
                  <TableCell>{teacher.teacher_id}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    {new Date(teacher.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(teacher.updatedAt).toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ display: 'flex', gap: 1 }}>
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
