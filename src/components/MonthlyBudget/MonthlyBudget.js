import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddIncomeForm from './AddIncomeForm';
import AddBudgetForm from './AddBudgetForm';
import BudgetGraph from './BudgetGraph';

const MonthlyBudget = () => {
  const [incomeData, setIncomeData] = useState(null);
  const [budgetData, setBudgetData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const handleIncomeSubmit = (data) => {
    setIncomeData(data);
    setShowIncomeForm(false);
  };

  const handleBudgetSubmit = (data) => {
    setBudgetData(data);
    setShowBudgetForm(false);
  };

  return (
    <Box>
      <Typography className="!font-bold" variant="h5" gutterBottom>
        Monthly Budget
      </Typography>
      {!incomeData && (
        <Button variant="contained" color="primary" onClick={() => setShowIncomeForm(true)}>
          Add Income
        </Button>
      )}
      {showIncomeForm && <AddIncomeForm onSubmit={handleIncomeSubmit} />}
      {incomeData && (
        <Box>
          <Typography variant="h6">Income: {incomeData.income}</Typography>
          <Typography variant="h6">Budget: {incomeData.budget}</Typography>
          <Typography variant="h6">Left Income: {incomeData.leftIncome}</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowBudgetForm(true)}>
            Add Expenses for Month
          </Button>
        </Box>
      )}
      {showBudgetForm && <AddBudgetForm onSubmit={handleBudgetSubmit} />}
      {budgetData.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6" className="!font-bold">Budget Details:</Typography>
          {budgetData.map((budget, index) => (
            <Typography key={index}>{`${budget.type}: ${budget.amount}`}</Typography>
          ))}
          <Button variant="contained" color="primary" onClick={() => setShowGraph(true)}>
            Show Graph
          </Button>
        </Box>
      )}
      <BudgetGraph open={showGraph} onClose={() => setShowGraph(false)} data={budgetData} />
    </Box>
  );
};

export default MonthlyBudget;
