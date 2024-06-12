import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Header from '../Header';
import Sidebar from '../Sidebar';
import MonthlyBudget from '../MonthlyBudget/MonthlyBudget';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'Monthly Budget':
        return <MonthlyBudget />;
      case 'Expense':
        return <Typography paragraph>Expense Content</Typography>;
      case 'Calendar':
        return <Typography paragraph>Calendar Content</Typography>;
      case 'Calculator':
        return <Typography paragraph>Calculator Content</Typography>;
      case 'Edit Profile':
        return <Typography paragraph>Edit Profile Content</Typography>;
      // case 'Logout':
      //   return <Typography paragraph>Logout Content</Typography>;
      default:
        return <Typography paragraph>Dashboard Content</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} setActiveItem={setActiveItem} />
      <Main open={open}>
        <div style={{ marginTop: '64px' }}> {/* Adjusting for the height of AppBar */}
          {renderContent()}
        </div>
      </Main>
    </Box>
  );
};

export default Dashboard;
