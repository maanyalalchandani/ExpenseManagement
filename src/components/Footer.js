import React from 'react';
import { Typography, Switch, Box } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const Footer = ({ darkMode, toggleDarkMode }) => (
  <footer style={{ 
    position: 'fixed', 
    bottom: 0, 
    width: '100%', 
    background: '#3f51b5', 
    color: '#fff', 
    padding: '10px 20px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  }}>
    <Typography variant="body2" style={{ color: '#fff' }}>
      &copy; {new Date().getFullYear()} Expense Management
    </Typography>
    <Box display="flex" alignItems="center">
      <LightMode style={{ marginRight: '8px' }} />
      <Switch
        checked={darkMode}
        onChange={toggleDarkMode}
        color="default"
      />
      <DarkMode style={{ marginLeft: '8px' }} />
    </Box>
  </footer>
);

export default Footer;