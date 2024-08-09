import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        EdTech Attendance Management
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Dashboard
      </Button>
      <Button color="inherit" component={Link} to="/attendance">
        Attendance
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
