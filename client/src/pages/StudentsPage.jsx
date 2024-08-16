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
} from '@mui/material';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', id: '' });
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
      setNewStudent({ name: '', id: '' });
      fetchStudents();
    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  const handleUpdateStudent = async () => {
    if (editStudent) {
      try {
        await api.updateStudent(editStudent.id, editStudent);
        setEditStudent(null);
        fetchStudents();
      } catch (error) {
        console.error('Failed to update student:', error);
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      if (id) {
        await api.deleteStudent(id);
        fetchStudents();
      } else {
        console.error('No student id provided');
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.id}</TableCell>
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
                    onClick={() => handleDeleteStudent(student.id)}
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

      <h2>Add New Student</h2>
      <TextField
        label="Name"
        variant="outlined"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        style={{ marginRight: '8px' }}
      />
      <TextField
        label="Age"
        type="number"
        variant="outlined"
        value={newStudent.age}
        onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
        style={{ marginRight: '8px' }}
      />
      <Button variant="contained" color="primary" onClick={handleCreateStudent}>
        Add Student
      </Button>

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
            label="Age"
            type="number"
            variant="outlined"
            value={editStudent.age}
            onChange={(e) =>
              setEditStudent({ ...editStudent, age: e.target.value })
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

export default Students;
