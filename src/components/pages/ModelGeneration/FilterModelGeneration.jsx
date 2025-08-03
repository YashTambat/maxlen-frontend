import React from "react";
import {
  Card,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

const FilterModelGeneration = ({
  filterOpen,
  filterColumn,
  setFilterColumn,
  filterValue,
  setFilterValue,
  handleFilter,
  handleCancelFilter,
  formData,
}) => {
  if (!filterOpen) return null;

  return (
    <Card className="p-4 mb-4" sx={{ backgroundColor: "rgb(230, 230, 250)", marginTop: "5px" }}>
      <Typography variant="h6" gutterBottom>
        Filter Records
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <select
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "white",
            }}
            className="form-select"
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
          >
            <option value="">Select Column</option>
            {Object.keys(formData)
              .filter((key) => key !== "id")
              .map((key) => (
                <option key={key} value={key}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </option>
              ))}
          </select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Enter Filter Value"
            sx={{
              backgroundColor: "white", // Full background color for the TextField
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white", // Ensures the input section is fully white
                height: "40px", // Set consistent height
              },
              "& .MuiInputLabel-root": {
                padding: "0 4px", // Optional: Adjusts label padding
              },
            }}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            style={{ marginRight: "10px", backgroundColor:"#2d4ef5"}}
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancelFilter}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FilterModelGeneration;
