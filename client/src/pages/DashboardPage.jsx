import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  CircularProgress,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { useFetchUsersQuery } from '../services/usersApi';

const DashboardPage = () => {
  const { data: users, isLoading, error } = useFetchUsersQuery();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Failed to load data</Typography>;
  }

  // Ensure users is an array, even if it's empty or undefined
  const userArray = Array.isArray(users) ? users : [];

  // Calculate the number of teachers and students
  const teachers = userArray.filter((user) => user.role === 'teacher');
  const students = userArray.filter((user) => user.role === 'student');

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5">Total Teachers</Typography>
                  <Typography variant="h3">{teachers.length || 0}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5">Total Students</Typography>
                  <Typography variant="h3">{students.length || 0}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teacher List Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Teachers</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                There are {teachers.length || 0} teachers
              </Typography>
              {/* Implement the table here, showing default data if needed */}
              {/* Example Placeholder */}
              {teachers.length === 0 ? (
                <Typography>No teachers available</Typography>
              ) : (
                <Typography>Display your teachers list here</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
