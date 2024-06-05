import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AuthLayout from './AuthLayout';
import { validateName, validateEmail, validatePhoneNumber, validatePassword, passwordsMatch } from './validations';

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

const RegisterForm = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!validateName(formData.name)) tempErrors.name = 'Name should not contain numbers.';
    if (!validateEmail(formData.email)) tempErrors.email = 'Email should have “@” and valid extension.';
    if (!validatePhoneNumber(formData.phoneNumber)) tempErrors.phoneNumber = 'Number should not have alphabets and be 10 digits.';
    if (!validatePassword(formData.password)) tempErrors.password = 'Password should be a combination of alphabets, numbers, and special characters.';
    if (!passwordsMatch(formData.password, formData.confirmPassword)) tempErrors.confirmPassword = 'Passwords do not match.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Please fill in the details to create an account.">
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
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
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          margin="normal"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
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
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>
        <Typography variant="body2" className={classes.link}>
          Already have an account? <Link to="/login">Sign in</Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;