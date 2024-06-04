import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Header = ({ initials = "User", onLogout }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
        Expense Management
      </Typography>
      <Button color="inherit">{initials}</Button>
      <Button color="inherit" onClick={onLogout}>Logout</Button>
    </Toolbar>
  </AppBar>
);

export default Header;
