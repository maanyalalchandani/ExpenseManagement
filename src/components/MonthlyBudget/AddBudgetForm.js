import React, { useState } from 'react';
import { Button, TextField, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddBudgetForm = ({ onSubmit }) => {
  const [budgets, setBudgets] = useState([{ type: '', amount: '' }]);
  const [total, setTotal] = useState(0);

  const handleChange = (index, field, value) => {
    const newBudgets = budgets.slice();
    newBudgets[index][field] = value;
    setBudgets(newBudgets);
    setTotal(newBudgets.reduce((sum, budget) => sum + Number(budget.amount), 0));
  };

  const handleAddBudget = () => {
    setBudgets([...budgets, { type: '', amount: '' }]);
  };

  const handleRemoveBudget = (index) => {
    const newBudgets = budgets.slice();
    newBudgets.splice(index, 1);
    setBudgets(newBudgets);
    setTotal(newBudgets.reduce((sum, budget) => sum + Number(budget.amount), 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(budgets);
  };

  return (
    <Box>
      <Typography variant="h6">Add Monthly Budget</Typography>
      <form onSubmit={handleSubmit}>
        {budgets.map((budget, index) => (
          <Box key={index} display="flex" alignItems="center">
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
        <Button onClick={handleAddBudget} variant="contained" color="primary">
          Add More Budget
        </Button>
        <Box mt={2}>
          <TextField
            label="Total"
            value={total}
            fullWidth
            margin="normal"
            type="number"
            disabled
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddBudgetForm;
