import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Footer = ({ darkMode, toggleDarkMode }) => (
  <footer style={{ position: 'fixed', bottom: 0, width: '100%', background: '#3f51b5', color: '#fff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="body2" style={{ color: '#fff' }}>
      &copy; {new Date().getFullYear()} Expense Management
    </Typography>
    <Button variant="contained" color="primary" onClick={toggleDarkMode}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  </footer>
);

export default Footer;
