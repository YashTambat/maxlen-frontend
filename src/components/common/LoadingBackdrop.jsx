// LoadingBackdrop.jsx
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingBackdrop = ({ isOpen }) => {
  return (
    <Backdrop
      sx={{
        color: "#2d4ef5",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isOpen}
    >
      <CircularProgress color="inherit" size={100} />
      {/* <img src="/chinmayleade.gif" alt="Loading..."  /> */}
    </Backdrop>
  );
};

export default LoadingBackdrop;
