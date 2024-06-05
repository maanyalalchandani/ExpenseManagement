import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } })}>
      <CssBaseline />
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} />} />
        </Routes>
        <Footer toggleDarkMode={toggleDarkMode} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
