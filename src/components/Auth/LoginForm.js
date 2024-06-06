import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AuthLayout from './AuthLayout';

const LoginForm = () => {
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
    // Simulate API call for authentication
    setTimeout(() => {
      setLoading(false);
      // Navigate to dashboard if authentication is successful
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <AuthLayout title="Welcome!" subtitle="Please sign in to continue.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ position: 'relative' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading}
            className="mt-4"
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
        <Typography variant="body2" className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-decoration-line: underline">Sign up</Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
