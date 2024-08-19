import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          EDTECH Attendance Management System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/students">
          Students
        </Button>
        <Button color="inherit" component={Link} to="/teachers">
          Teachers
        </Button>
        <Button color="inherit" component={Link} to="/admins">
          Admins
        </Button>
        <Button color="inherit" component={Link} to="/attendance">
          Attendance
        </Button>
        <Button color="inherit" component={Link} to="/users">
          User
        </Button>
        <Button color="inherit" component={Link} to="/test">
          Test
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
