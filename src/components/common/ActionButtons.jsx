import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Height } from "@mui/icons-material";
import CustomTooltip from "./CustomTooltip";

const ActionButtons = ({                 // button for Add and Filter Icons button
  showForm,
  onAddClick,
  filterOpen,
  onFilterClick,
}) => {
  return (
    <>
    <Box>
      {!filterOpen && (
        <CustomTooltip title={showForm ? "Cancel" : "Add a new item"} arrow>
          <Button
            variant="contained"
            onClick={onAddClick}
            sx={{
              backgroundColor: showForm ? 'red' : '#2d4ef5',
              color: showForm ? 'white' : 'white',
              '&:hover': {
                backgroundColor: showForm ? 'darkred' : 'primary.dark',
              },
            }}
          >
            {showForm ? "Cancel" : <AddIcon />}
          </Button>
        </CustomTooltip>
      )}

      {!showForm && !filterOpen && (
        <CustomTooltip title="Filter Records" arrow>
          <Button
            style={{ marginLeft: "1%" }}
            onClick={onFilterClick}
            sx={{
              backgroundColor: "#2d4ef5",
              color: "white",
              '&:hover': {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <FilterAltIcon />
          </Button>
        </CustomTooltip>
      )}
</Box>
    </>
  );
};

export default ActionButtons;
