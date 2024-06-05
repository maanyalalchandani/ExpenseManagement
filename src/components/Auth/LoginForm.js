import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AuthLayout from './AuthLayout';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
  link: {
    marginTop: '1rem',
    textAlign: 'center',
  },
});

const LoginForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <AuthLayout title="Welcome!" subtitle="Please sign in to continue.">
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            className={classes.button}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
        <Typography variant="body2" className={classes.link}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
