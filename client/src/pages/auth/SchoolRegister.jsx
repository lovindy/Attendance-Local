import React, { useState } from 'react';
import { useSignupMutation } from '../../services/auth';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import Logo from '../../data/svg/school logo.svg'; // Update this path based on your file structure

const SchoolRegister = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, phone, address }).unwrap();
      // Handle successful signup (e.g., redirect, show message)
    } catch (error) {
      // Handle signup error (e.g., show error message)
      console.error('Failed to signup:', error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={5}>
        <Paper elevation={6} style={{ padding: '2rem' }}>
          {/* Logo */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginBottom: '1rem' }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          </Box>

          <Typography variant="h5" gutterBottom align="center">
            Introduce Your School to WaveTrack
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="school's Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="phone number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <Box mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Finish'}
              </Button>
            </Box>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SchoolRegister;
