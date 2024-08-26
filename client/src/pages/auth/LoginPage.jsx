import React, { useState } from 'react';
import { useLoginMutation } from '../../services/auth';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
      // Handle successful login (e.g., redirect, show message)
    } catch (error) {
      // Handle login error (e.g., show error message)
      console.error('Failed to login:', error);
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
          <Typography variant="h5" gutterBottom>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? 'Logging in...' : 'Sign In'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
