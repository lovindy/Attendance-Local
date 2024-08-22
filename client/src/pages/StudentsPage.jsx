import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from '@mui/material';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', student_id: '' });
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await api.fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleCreateStudent = async () => {
    try {
      await api.createStudent(newStudent);
      setNewStudent({ name: '', student_id: '' });
      fetchStudents();
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  const handleUpdateStudent = async () => {
    if (editStudent) {
      try {
        const response = await api.updateStudent(editStudent.student_id, {
          name: editStudent.name,
          student_id: editStudent.student_id,
        });
        console.log('Update response:', response);
        setEditStudent(null);
        fetchStudents();
      } catch (error) {
        console.error('Failed to update student:', error);
        console.log(error.response?.data);
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await api.deleteStudent(id);
      fetchStudents(); // Fetch students again to update the list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="app-component">
      <h1>Add New Student</h1>
      {/* Form for the input fields */}
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
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
          fullWidth
        />
        <TextField
          label="Class ID"
          type="number"
          variant="outlined"
          value={newStudent.class_id}
          onChange={(e) =>
            setNewStudent({ ...newStudent, class_id: e.target.value })
          }
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateStudent}
        >
          Add Student
        </Button>
      </Box>

      <h1>Student List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell>UpdatedAt</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>{student.class_id}</TableCell>
                <TableCell>{student.user_id}</TableCell>
                <TableCell>{student.createdAt}</TableCell>
                <TableCell>{student.updatedAt}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditStudent(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteStudent(student.student_id)}
                    style={{ marginLeft: '8px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editStudent && (
        <div>
          <h2>Edit Student</h2>
          <TextField
            label="Name"
            variant="outlined"
            value={editStudent.name}
            onChange={(e) =>
              setEditStudent({ ...editStudent, name: e.target.value })
            }
            style={{ marginRight: '8px' }}
          />
          <TextField
            label="Student ID"
            type="number"
            variant="outlined"
            value={editStudent.student_id}
            onChange={(e) =>
              setEditStudent({ ...editStudent, student_id: e.target.value })
            }
            style={{ marginRight: '8px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateStudent}
            style={{ marginRight: '8px' }}
          >
            Update Student
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setEditStudent(null)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
