import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { BASE_URL } from "../../../config";
import { Button } from "@mui/material"; // Using Material-UI for the toggle button

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);
const EachProductDashBoardChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState("bar");

  const fetchChartData = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        throw new Error("Missing authentication tokens.");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      };

      console.log("Fetching chart data...");
      const response = await axios.get(
        `${BASE_URL}/private/paymentorder/totalInvested/dashboard`,
        { headers }
      );

      if (response.status === 200 && response.data?.list?.length) {
        const apiData = response.data.list;

        const labels = apiData.map((item) => item.value.split(" (Deposit:")[0]);
        const packageCounts = apiData.map((item) => item.key);
        const deposits = apiData.map((item) =>
          parseFloat(item.value.match(/Deposit: (\d+(\.\d+)?)/)?.[1] || 0)
        );

        // Calculate the ratio of total invested to deposit amount
        const ratio = packageCounts.map((totalInvested, index) => {
          const depositAmount = deposits[index];
          return depositAmount !== 0 ? totalInvested / depositAmount : 0;
        });

        const colors = [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ];

        const borderColors = colors.map((color) => color.replace("0.6", "1"));

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Invested, ",
              data: packageCounts,
              backgroundColor: colors,
              borderColor: borderColors,
              borderWidth: 1.5,
              type: chartType,
              yAxisID: "y1",
              fill: chartType === "line" ? false : true,
              tension: 0.4,
            },
            {
              label: "Deposit Amount",
              data: deposits,
              backgroundColor: "rgba(0, 128, 0, 0.6)",
              borderColor: "rgba(0, 128, 0, 1)",
              borderWidth: 2,
              type: "line",
              fill: false,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "white",
              pointBorderColor: "rgba(0, 128, 0, 1)",
              yAxisID: "y2",
            },
            {
              label: "Number Of Packages = (Total Invested / Deposit)",
              data: ratio,
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 2,
              type: "line",
              fill: false,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "white",
              pointBorderColor: "rgba(255, 159, 64, 1)",
              yAxisID: "y3", // New axis for the ratio
            },
          ],
        });
      } else {
        throw new Error("No data found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to load chart data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [chartType]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        maxHeight: "800px",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#333" }}>
        Total Payment Each Dashboard
      </h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}
        style={{ marginBottom: "15px" }}
      >
        Switch to {chartType === "bar" ? "Line Chart" : "Bar Chart"}
      </Button>

      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : chartData ? (
        chartType === "bar" ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y1: {
                  beginAtZero: true,
                  title: { display: true, text: "Total Invested" },
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.1)" },
                },
                y2: {
                  beginAtZero: true,
                  title: { display: true, text: "Deposit Amount" },
                  position: "right",
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.1)" },
                },
                y3: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Total Packages Ratio (Invested / Deposit)",
                  },
                  position: "right",
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.1)" },
                },
                x: {
                  title: { display: true, text: "Product Names" },
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.05)" },
                },
              },
              plugins: {
                legend: { position: "top" },
              },
            }}
            height={400}
          />
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y1: {
                  beginAtZero: true,
                  title: { display: true, text: "Total Invested" },
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.1)" },
                },
                y2: {
                  beginAtZero: true,
                  title: { display: true, text: "Deposit Amount" },
                  position: "right",
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.1)" },
                },
                y3: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Total Packages Ratio (Invested / Deposit)",
                  },
                  position: "right",
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.1)" },
                },
                x: {
                  title: { display: true, text: "Product Names" },
                  grid: { drawBorder: false, color: "rgba(0, 0, 0, 0.05)" },
                },
              },
              plugins: {
                legend: { position: "top" },
              },
            }}
            height={400}
          />
        )
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EachProductDashBoardChart;
