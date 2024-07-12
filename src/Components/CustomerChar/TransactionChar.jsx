import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function CustomerChart({ customerId, transactions }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!transactions) return;

    const customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );

    const transactionsPerDay = customerTransactions.reduce(
      (acc, transaction) => {
        acc[transaction.date] =
          (acc[transaction.date] || 0) + transaction.amount;
        return acc;
      },
      {}
    );

    const labels = Object.keys(transactionsPerDay);
    const data = Object.values(transactionsPerDay);

    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance if it exists
    if (chartRef.current._chartInstance) {
      chartRef.current._chartInstance.destroy();
    }

    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Total Transaction Amount",
            data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
    });

    // Save chart instance to the canvas element for future reference
    chartRef.current._chartInstance = chartInstance;
  }, [customerId, transactions]);

  return <canvas ref={chartRef} id="transactionChart"></canvas>;
}

export default CustomerChart;
