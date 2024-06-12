import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const AddIncomeForm = ({ onSubmit }) => {
  const [income, setIncome] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const leftIncome = income - budget;
    onSubmit({ income, budget, leftIncome });
  };

  return (
    <Box>
      <Typography variant="h6">Add Income</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Total Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Left Income"
          value={income - budget}
          fullWidth
          margin="normal"
          type="number"
          disabled
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddIncomeForm;
