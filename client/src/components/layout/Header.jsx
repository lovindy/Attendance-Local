import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ width: 250 }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemText primary="User" />
        </ListItem>
        <ListItem button component={Link} to="/admins">
          <ListItemText primary="Admin" />
        </ListItem>
        <ListItem button component={Link} to="/teachers">
          <ListItemText primary="Teacher" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={Link} to="/classes">
          <ListItemText primary="Class" />
        </ListItem>
        <ListItem button component={Link} to="/subjects">
          <ListItemText primary="Subject" />
        </ListItem>
        <ListItem button component={Link} to="/sessions">
          <ListItemText primary="Sessions" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemText primary="Report" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: '#fff', color: '#333' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, color: '#000' }}>
            WaveTrack
          </Typography>
          <IconButton color="inherit">
            <AccountCircleIcon style={{ color: '#000' }} />
            <Typography variant="body1" style={{ marginLeft: 8 }}>
              Christaino Ronaldo
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </div>
  );
};

export default Navbar;
