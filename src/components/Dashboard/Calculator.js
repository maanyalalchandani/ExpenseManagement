import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';

const Calculator = () => {
  const [expression, setExpression] = useState('');

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

  return (
    <Box p={3}>
      <TextField value={expression} fullWidth margin="normal" variant="outlined" InputProps={{ readOnly: true }} />
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
          <Grid item xs={3} key={num}>
            <Button variant="contained" fullWidth onClick={() => handleButtonClick(num.toString())}>{num}</Button>
          </Grid>
        ))}
        {['+', '-', '*', '/'].map(op => (
          <Grid item xs={3} key={op}>
            <Button variant="contained" fullWidth onClick={() => handleButtonClick(op)}>{op}</Button>
          </Grid>
        ))}
        <Grid item xs={6}>
          <Button variant="contained" fullWidth onClick={handleClear}>Clear</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth onClick={handleEvaluate}>=</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
