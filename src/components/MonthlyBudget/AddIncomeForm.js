import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Card, CardContent } from '@mui/material';

const AddIncomeForm = ({ onSubmit, initialIncome, initialBudget }) => {
  const [income, setIncome] = useState(initialIncome);
  const [budget, setBudget] = useState(initialBudget);

  const handleSubmit = (event) => {
    event.preventDefault();
    const leftIncome = income - budget;
    onSubmit({ income, budget, leftIncome });
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Add Income</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Total Income"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddIncomeForm;
