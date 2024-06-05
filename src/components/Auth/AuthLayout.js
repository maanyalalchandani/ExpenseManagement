import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  layoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    padding: '2rem',
    backgroundColor: '#2196f3',
    color: '#ffffff',
  },
  formSection: {
    width: '50%',
    padding: '2rem',
  },
  title: {
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.1rem',
  },
});

const AuthLayout = ({ title, subtitle, children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.layoutContainer}>
        <Box className={classes.infoSection}>
          <Typography variant="h4" component="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="h6" component="h2" className={classes.subtitle}>
            {subtitle}
          </Typography>
        </Box>
        <Box className={classes.formSection}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
