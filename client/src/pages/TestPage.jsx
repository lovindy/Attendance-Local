import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function TestPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', subject: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/teachers'
        );
        console.log('Response data:', response.data);

        const teacherData = response.data.data;
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/teachers', form);

      // Refetch the updated list of teachers after adding a new one
      const response = await axios.get('http://localhost:8000/api/v1/teachers');
      setTeachers(response.data); // Update the teachers state with the latest data

      // Clear form fields after successful addition
      setForm({ name: '', subject: '' });
      setSnackbarMessage('Teacher added successfully');
    } catch (error) {
      console.error('Error adding teacher:', error);
      setSnackbarMessage(
        error.response?.data?.message || 'Failed to add teacher'
      );
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container className='app-component'>
      <Typography variant="h4" gutterBottom>
        Teachers
      </Typography>

      <Typography variant="h6" gutterBottom>
        Add New Teacher
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Add Teacher
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {teachers.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, index) => (
                <TableRow key={teacher.id || `${teacher.name}-${index}`}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    {new Date(teacher.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(teacher.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No teachers found or data is not an array</Typography>
      )}
    </Container>
  );
}

export default TestPage;
