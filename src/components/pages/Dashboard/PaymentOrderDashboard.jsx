import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
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

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const PaymentOrderDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("accessToken"); // Replace with the key for your access token
    const refreshToken = localStorage.getItem("refreshToken"); // Replace with the key for your refresh token

    if (!accessToken || !refreshToken) {
      console.error("Access or refresh token is missing");
      return null; // Return null if tokens are not available
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  };

  const fetchChartData = async () => {
    console.log("Fetching chart data...");
    try {
      const headers = getAuthHeaders();
      if (!headers) {
        console.error("No headers, skipping API call.");
        return;
      }

      console.log("Calling API...");
      const response = await axios.get(
        `${BASE_URL}/private/paymentorder/dashboard`,
        { headers }
      );

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data?.list) {
        const apiData = response.data.list;
        const labels = apiData.map((item) => item.value.split(" (Deposit:")[0]);
        const packageCounts = apiData.map((item) => item.key);
        const deposits = apiData.map((item) =>
          parseFloat(item.value.match(/Deposit: (\d+(\.\d+)?)/)?.[1] || 0)
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Packages",
              data: packageCounts,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              type: "bar",
              yAxisID: "y1", // Link to the left Y-axis
            },
            {
              label: "Deposit Amount",
              data: deposits,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
              type: "line",
              fill: false,
              tension: 0.4, // Smooth curve
              yAxisID: "y2", // Link to the right Y-axis
            },
          ],
        });
      } else {
        console.error("Invalid API response format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Component mounted, calling fetchChartData...");
    fetchChartData();
  }, [localStorage.getItem("authToken")]);

  return (
    <div
      style={{
        width: "100%",
        height: "120%", // Use 100% height to fit inside the grid container
        maxHeight: "400px", // Max height to prevent overflow
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>Number Of Packages & Deposit Of Each</h2>
      {loading ? (
        <p>Loading chart...</p>
      ) : chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y1: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Packages",
                },
              },
              y2: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Deposit Amount",
                },
                position: "right", // Place the deposit scale on the right
              },
              x: {
                title: {
                  display: true,
                  text: "Product Names",
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
          height={400} // Keep a fixed height for the chart itself
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default PaymentOrderDashboard;
