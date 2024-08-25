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

  if (!Array.isArray(users)) {
    return <Typography color="error">Unexpected data format</Typography>;
  }

  // Calculate the number of teachers and students
  const teachers = users.filter((user) => user.role === 'teacher');
  const students = users.filter((user) => user.role === 'student');

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
                  <Typography variant="h5">Total Teacher</Typography>
                  <Typography variant="h3">{teachers.length}</Typography>
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
                  <Typography variant="h5">Total Student</Typography>
                  <Typography variant="h3">{students.length}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Teacher List Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">TOTAL TEACHER</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                There are {teachers.length} teachers
              </Typography>
              {/* Implement the table here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
