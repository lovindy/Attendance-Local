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
        <ListItem button component={Link} to="/attendance">
          <ListItemText primary="Attendance" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={Link} to="/teachers">
          <ListItemText primary="Teachers" />
        </ListItem>
        <ListItem button component={Link} to="/admins">
          <ListItemText primary="Admins" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemText primary="User" />
        </ListItem>
        <ListItem button component={Link} to="/classes">
          <ListItemText primary="Class" />
        </ListItem>
        <ListItem button component={Link} to="/test">
          <ListItemText primary="Test" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}></div>{' '}
          {/* This empty div takes up the space in the middle */}
          <Typography variant="h6">WaveTrack</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </div>
  );
};

export default Navbar;
