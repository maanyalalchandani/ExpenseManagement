import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BudgetIcon from '@mui/icons-material/MonetizationOn';
import ExpenseIcon from '@mui/icons-material/ReceiptLong';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
//import CalculatorIcon from '@mui/icons-material/Calculate';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { logout } from './store/authSlice';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ open, handleDrawerClose, setActiveItem }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); 
  };

  const sidebarItems = [
    { text: 'Home', icon: <HomeIcon />},
    { text: 'Monthly Budget', icon: <BudgetIcon /> },
    { text: 'Daily Expenses', icon: <ExpenseIcon /> },
    { text: 'Calendar', icon: <CalendarTodayIcon /> },
    //{ text: 'Calculator', icon: <CalculatorIcon /> },
    { text: 'Edit Profile', icon: <EditIcon /> },
    { text: 'Logout', icon: <LogoutIcon />, action: handleLogout },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.action || (() => setActiveItem(item.text))}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
