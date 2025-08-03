import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// Custom styled Tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: 'white', // Background color: blue
    color: 'rgb(45, 78, 245)',            // Text color: white
    fontSize: '1.2rem',                  // Increase font size
    padding: '12px 16px',                // Increase padding for height/width
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add shadow
    maxWidth: '300px',                   // Adjust maximum width of the tooltip
    
  },
  [`& .MuiTooltip-arrow`]: {
    display: 'none',                     // Hide the arrow
  },
}));

const DrawerToolTips = ({ title, children, ...props }) => {
  return (
    <StyledTooltip title={title} arrow {...props}>
      {children}
    </StyledTooltip>
  );
};

export default DrawerToolTips;
