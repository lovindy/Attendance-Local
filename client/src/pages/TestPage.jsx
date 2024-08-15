import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  TextField,
  Button,
  Snackbar,
  Alert,
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

        const teacherData = response.data.data.data;
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
      const response = await axios.post(
        'http://localhost:8000/api/v1/teachers',
        form
      );

      console.log('Teacher added:', response.data);

      if (response.data && response.data.data) {
        // Add the new teacher to the list
        setTeachers((prevTeachers) => [...prevTeachers, response.data.data]);
        setSnackbarMessage('Teacher added successfully');
      } else {
        throw new Error('Unexpected response structure');
      }
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
    <Container>
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

      <Grid container spacing={2} marginTop={2}>
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={teacher.id || `${teacher.name}-${index}`}
            >
              <Card>
                <CardContent>
                  <Typography variant="h6">{teacher.name}</Typography>
                  <Typography color="textSecondary">
                    Subject: {teacher.subject}
                  </Typography>
                  <Typography color="textSecondary">
                    CreatedAt: {teacher.createdAt}
                  </Typography>
                  <Typography color="textSecondary">
                    UpdatedAt: {teacher.updatedAt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No teachers found or data is not an array</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default TestPage;
