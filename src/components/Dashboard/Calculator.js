import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Paper, useTheme } from '@mui/material';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const theme = useTheme();

  const handleButtonClick = (value) => {
    setExpression(prev => prev + value);
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleEvaluate = () => {
    try {
      setExpression(eval(expression).toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const buttonStyle = {
    height: '60px',
    fontSize: '1.2rem',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
    },
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: '300px', margin: 'auto', p: 2 }}>
      <TextField 
        value={expression} 
        fullWidth 
        margin="normal" 
        variant="outlined" 
        InputProps={{ 
          readOnly: true,
          style: { fontSize: '1.5rem', textAlign: 'right' }
        }} 
      />
      <Grid container spacing={1}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((item) => (
          <Grid item xs={3} key={item}>
            <Button 
              variant="contained" 
              fullWidth 
              sx={buttonStyle}
              onClick={() => item === '=' ? handleEvaluate() : handleButtonClick(item)}
            >
              {item}
            </Button>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            fullWidth 
            sx={{...buttonStyle, backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText}}
            onClick={handleClear}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Calculator;