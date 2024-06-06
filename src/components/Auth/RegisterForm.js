import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AuthLayout from './AuthLayout';
import { validateName, validateEmail, validatePhoneNumber, validatePassword, passwordsMatch } from './validations';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear previous error message when user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, username, email, phone, password, confirmPassword } = formData;

    // Perform form validation
    const newErrors = {};
    if (!validateName(name)) {
      newErrors.name = 'Please enter a valid name';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!validatePhoneNumber(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long, containing at least one letter, one number, and one special character';
    }
    if (!passwordsMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      // If there are errors, set them in the state and prevent form submission
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API call for registration
    setTimeout(() => {
      setLoading(false);
      // Navigate to login page after registration
      navigate('/login');
    }, 2000);
  };

  return (
    <AuthLayout title="Create Account" subtitle="Please fill in the details to create an account.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
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
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Phone Number"
          name="phone"
          fullWidth
          margin="normal"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
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
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>
        <Typography variant="body2" className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-decoration-line: underline">Sign in</Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;
