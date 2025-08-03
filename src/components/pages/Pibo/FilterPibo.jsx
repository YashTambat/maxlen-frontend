import React from 'react';
import { Card, Typography, Grid, TextField, Button } from '@mui/material';

const FilterPibo = ({ filterOpen, formData, filterColumn, setFilterColumn, filterValue, setFilterValue, handleFilter, handleCancelFilter }) => {
  return (
    filterOpen && (
      <Card className="p-4 mb-4" sx={{ backgroundColor: "rgb(230, 230, 250)", marginTop: "5px" }}>
        <Typography variant="h6" gutterBottom>
          Filter Records
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <select
              className="form-select"
              value={filterColumn}
              onChange={(e) => setFilterColumn(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
              }}
            >
              <option value="">Select Column</option>
              {Object.keys(formData)
                .filter((key) => key !== "id" && key !== "pinCode" && key !== "password" &&
                  key !== "confirmpassword" && key !== "companyLegalName" &&
                  key !== "cin" && key !== "companyPan" &&
                  key !== "companyPanLegalName" && key !== "companyPanLegalFatherName" &&
                  key !== "dateOfIncorporation" && key !== "personName" &&
                  key !== "personReservedNumber" && key !== "personPan" &&
                  key !== "personPanName" && key !== "personPanFatherName" &&
                  key !== "personPanDateOfBirth" && key !== "gst" &&
                  key !== "tan" && key !== "licenseNo" &&
                  key !== "otherInformation" && key !== "userView" &&
                  key !== "fileModel" && key !== "name" &&
                  key !== "personMobileNum" && key !== "mobile" &&
                  key !== "email")
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
              label="Enter Value"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              InputProps={{
                sx: {
                  height: "40px",
                  alignItems: "center",
                  backgroundColor: "white",
                },
              }}
              InputLabelProps={{
                sx: {
                  top: "-4px",
                  fontSize: "14px",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              style={{ marginRight: "10px" ,backgroundColor:"#2d4ef5"}}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelFilter}
              style={{backgroundColor:"red" ,color:"white"}}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    )
  );
};

export default FilterPibo;
