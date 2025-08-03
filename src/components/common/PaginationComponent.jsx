import React from "react";
import { Box, Pagination, Select, MenuItem, Typography } from "@mui/material";

const PaginationComponent = ({
  currentPage,
  totalRecords,
  recordsPerPage,
  onPageChange,
  onRecordsPerPageChange,
  recordsPerPageOptions = [5, 10, 15,20],

}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">Records per page:</Typography>
        <Select 
        
          value={recordsPerPage}
          onChange={(e) => onRecordsPerPageChange(Number(e.target.value))}
        >
          {recordsPerPageOptions.map((option, index) => (
            <MenuItem key={index} value={option} >
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page) }
        // color="primary" 
        // color="#2d4ef5"
        // sx={{ marginTop: 2 }}

        sx={{
          marginTop: 2,
          '& .Mui-selected': { // Apply background color to the selected page
            backgroundColor: '#2d4ef5',
            color: '#2d4ef5', // Adjust text color if needed
            '&:hover': {
              backgroundColor: '#2451c4', // Optional hover effect
            },
          },
          '& .MuiPaginationItem-root': { // Apply styles to all pagination items
            backgroundColor: '#E3F2FD', // Light blue for unselected pages
            color: '#2d4ef5',
            '&:hover': {
              backgroundColor: '#BBDEFB', // Optional hover effect
            },
          },
        }}
      />
    </Box>
  );
};

export default PaginationComponent;
