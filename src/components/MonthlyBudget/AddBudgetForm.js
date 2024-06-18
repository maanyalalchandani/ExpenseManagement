import React, { useState } from 'react';
import { Button, TextField, Box, IconButton, Typography, Card, CardContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddBudgetForm = ({ onSubmit, totalBudget }) => {
  const [budgets, setBudgets] = useState([{ type: '', amount: '' }]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newBudgets = budgets.slice();
    newBudgets[index][field] = value;
    setBudgets(newBudgets);
    const newTotal = newBudgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
    setTotal(newTotal);
    setError(newTotal > totalBudget ? 'Total expenses exceed budget!' : '');
  };

  const handleAddBudget = () => {
    setBudgets([...budgets, { type: '', amount: '' }]);
  };

  const handleRemoveBudget = (index) => {
    const newBudgets = budgets.slice();
    newBudgets.splice(index, 1);
    setBudgets(newBudgets);
    const newTotal = newBudgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
    setTotal(newTotal);
    setError(newTotal > totalBudget ? 'Total expenses exceed budget!' : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (total > totalBudget) {
      setError('Total expenses exceed budget!');
      return;
    }
    onSubmit(budgets);
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Add Budget</Typography>
        <form onSubmit={handleSubmit}>
          {budgets.map((budget, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                label="Type of Expense"
                value={budget.type}
                onChange={(e) => handleChange(index, 'type', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Amount"
                value={budget.amount}
                onChange={(e) => handleChange(index, 'amount', e.target.value)}
                fullWidth
                margin="normal"
                type="number"
              />
              <IconButton onClick={() => handleRemoveBudget(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddBudget} variant="contained" color="primary" fullWidth sx={{ mb: 2 }} disabled={total > totalBudget}>
            Add Expense
          </Button>
          <TextField
            label="Total"
            value={total}
            fullWidth
            margin="normal"
            type="number"
            disabled
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBudgetForm;
