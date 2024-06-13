import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetGraph = ({ open, onClose, data }) => {
  // Generate a unique color for each data point using chroma.js
  const colorScale = chroma.scale('Spectral').colors(data.length);

  const graphData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        data: data.map(item => item.amount),
        backgroundColor: colorScale,
      },
    ],
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Expense Distribution</DialogTitle>
      <DialogContent>
        <Pie data={graphData} />
      </DialogContent>
    </Dialog>
  );
};

export default BudgetGraph;

