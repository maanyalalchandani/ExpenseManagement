import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AuthLayout from './AuthLayout';
import { login } from '../store/authSlice';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(login({ username, password }));
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        setErrors({ login: 'Invalid username or password' });
      }
    }, 2000);
  };

  return (
    <AuthLayout title="Sign In" subtitle="Please enter your login details.">
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
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
        {errors.login && (
          <Typography color="error" className="text-center mt-4">
            {errors.login}
          </Typography>
        )}
        <Typography variant="body2" className="text-center mt-4">
          Don't have an account? <Link to="/register" className="text-decoration-line: underline">Register</Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
