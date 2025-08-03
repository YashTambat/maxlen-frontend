import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

// Custom styled Tooltip
const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: 'rgb(45, 78, 245)', // Background color: blue
    color: 'white',            // Text color: white
    fontSize: '0.875rem',      // Optional: Adjust font size
  },
}));

const CustomTooltip = ({ title, children, ...props }) => {
  return (
    <StyledTooltip title={title} arrow {...props}>
      {children}
    </StyledTooltip>
  );
};

export default CustomTooltip;
