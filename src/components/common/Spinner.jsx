// src/components/Spinner.jsx
import React from "react";
import Box from "@mui/material/Box";

const Spinner = ({ message = "Loading data..." }) => {
  return (
    <Box
    component="main"
      sx={{  
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200%",
        flexGrow: 1, p: 3 ,position: "relative"
      }}
    >
      <img
        src="Spinner@1x-1.0s-200px-200px.gif"
        alt="Loading..."
        style={{ width: "200px", height: "200px" }}
      />
      <Box sx={{ marginTop: "20px", color: "black", fontSize: "18px" }}>
        {message}
      </Box>
    </Box>
  );
};

export default Spinner;
