import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import "./styles/global.css"

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const MainLayout = () => {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register';

    return (
      <>
        {!hideHeaderFooter && <Header isLoggedIn={isLoggedIn} />}
        <Routes>
          <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        {!hideHeaderFooter && <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainLayout />
      </Router>
    </ThemeProvider>
  );
};

export default App;
