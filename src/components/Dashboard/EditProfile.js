import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, TextField, Typography, CircularProgress, InputAdornment, 
  Card, CardContent, useTheme, Avatar, Grid 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SaveIcon from '@mui/icons-material/Save';
import { validateName, validateEmail } from '../Auth/validations'
import { updateUserProfile } from '../store/authSlice';

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email } = formData;

    const newErrors = {};
    if (!validateName(name)) {
      newErrors.name = 'Please enter a valid name';
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(updateUserProfile({ name, email }));
      // You might want to show a success message here
    }, 1000);
  };

  return (
    <Box sx={{ 
      maxWidth: 500, 
      margin: 'auto', 
      mt: 4, 
      p: 3, 
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      <Card elevation={3} sx={{ backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                mb: 2, 
                backgroundColor: theme.palette.primary.main 
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h4" gutterBottom color="primary">
              Edit Profile
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ position: 'relative' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={loading}
                    startIcon={<SaveIcon />}
                    sx={{ 
                      height: 56,
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Update Profile'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;