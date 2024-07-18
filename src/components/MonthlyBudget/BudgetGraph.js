import React, { useMemo } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import CloseIcon from '@mui/icons-material/Close';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import chroma from 'chroma-js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetGraph = ({ open, onClose, data }) => {
  const groupedData = useMemo(() => {
    return data.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});
  }, [data]);

  const chartData = useMemo(() => {
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);
    const colors = chroma.scale(['#fafa6e', '#2A4858']).mode('lch').colors(labels.length);

    return {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          hoverBackgroundColor: colors.map(color => chroma(color).brighten(0.5).hex()),
        },
      ],
    };
  }, [groupedData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Expense Distribution
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ height: '400px' }}>
          <Pie data={chartData} options={options} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetGraph;