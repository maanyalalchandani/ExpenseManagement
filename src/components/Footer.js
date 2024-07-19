import React from 'react';
import { Typography, Switch, Box, useTheme } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const Footer = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();

  const handleThemeChange = (event) => {
    event.preventDefault();
    toggleDarkMode();
  };

  return (
    <footer style={{ 
      position: 'fixed', 
      bottom: 0, 
      width: '100%', 
      background: theme.palette.primary.main, 
      color: theme.palette.primary.contrastText, 
      padding: '10px 20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <Typography variant="body2" style={{ color: theme.palette.primary.contrastText }}>
        &copy; {new Date().getFullYear()} Expense Management
      </Typography>
      <Box display="flex" alignItems="center">
        <LightMode style={{ marginRight: '8px', color: theme.palette.primary.contrastText }} />
        <Switch
          checked={darkMode}
          onChange={handleThemeChange}
          color="default"
        />
        <DarkMode style={{ marginLeft: '8px', color: theme.palette.primary.contrastText }} />
      </Box>
    </footer>
  );
};

export default Footer;