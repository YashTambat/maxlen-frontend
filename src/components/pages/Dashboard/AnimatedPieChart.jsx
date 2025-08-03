import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { BASE_URL } from "../../../config";

const AnimatedPieChart = () => {
  const [chartData, setChartData] = useState([
    ["Task", "Quantity"], // Default structure
  ]);

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
    try {
      const headers = getAuthHeaders(); // Get the auth headers
      if (!headers) {
        console.error("Authorization headers are missing");
        return;
      }

      const response = await axios.get(
        `${BASE_URL}/private/modelgenerations/dashboard`,
        { headers }
      );

      if (response.status === 200 && response.data?.list) {
        const apiData = response.data.list.map((item) => [
          item.value,
          item.key,
        ]);
        console.log("check apiData ?", apiData);
        setChartData([["Task", "Quantity"], ...apiData]); // Append API data to the header
      } else {
        console.error("Failed to fetch chart data");
      }
    } catch (error) {
      console.error("Error while fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const options = {
    title: "Total QR Generated for  Product Types",
    chartArea: { width: "70%", height: "70%" },
    // pieHole: 0, // 0 for solid pie chart
    // legend: { position: "bottom" },

    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
  };

  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
      width={"100%"}
      height={"550px"}
    />
  );
};

export default AnimatedPieChart;
