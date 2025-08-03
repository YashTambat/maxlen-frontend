import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import CustomTooltip from "../../common/CustomTooltip.jsx";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { styled } from "@mui/material/styles";
// import { StyledTableCell, StyledTableRow } from "../StyledTableComponents"; 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "15px",
    backgroundColor:"white",
    color:"black",
    // textAlign: "center", // Ensure center alignment

  }));
  
  const StyledTableRow = styled(TableRow)(({ theme, isEven }) => ({ 
    '&:hover': {
      backgroundColor: 'lavender', // Hover color for table cells
    },
  }));
const ModelGenerationTables = ({ data, formData, handleEdit, handleDelete }) => {

  const columnMapping = {
    productName: "NAME",
    productPackingType: "PACKING TYPE",
    productPackingMaterial: "PACKING  MATERAIL",
    productWeight: "WEIGHT",
    productPackageWeight: "PACKAGE WEIGHT",
    productVolume: "VOLUME",
    productDescription: "DESCRIPTION",
  
    // Add mappings for other keys as needed
  };

  console.log("data : ?",data)
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(formData)
              .filter(
                (key) =>
                  key !== "id" &&
                  key !== "fileModels" &&
                  key !== "piboUserModel"
              ) // Exclude ID column
              .map((key) => (
                <StyledTableCell key={key}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  {/* {columnMapping[key] || key.replace(/([A-Z])/g, " $1").toUpperCase()} */}
                </StyledTableCell>
              ))}
            <StyledTableCell>ACTION</StyledTableCell> {/* Add Action column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <StyledTableRow key={index}>
                {Object.keys(formData)
                  .filter(
                    (key) =>
                      key !== "id" &&
                      key !== "fileModels" &&
                      key !== "piboUserModel"
                  ) // Exclude ID column
                  .map((key) => (
                    <TableCell key={key}>{item[key]}</TableCell>
                  ))}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1, // Add spacing between buttons
                    }}
                  >
                    <CustomTooltip title="Edit record" arrow>
                      <Button
                        // variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(item)} // handle edit functionality
                        sx={{
                          minWidth: "36px",
                          padding: "6px",
                          color:"#2d4ef5",                          
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </CustomTooltip>

                    <CustomTooltip title="Delete record" arrow>
                      <Button
                        // variant="outlined"
                        color="error"
                        onClick={() => handleDelete(item.id)} // handle delete functionality
                        sx={{
                          minWidth: "36px",
                          padding: "6px",
                          marginLeft: "-13px"
                          
                        }}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </CustomTooltip>
                  </Box>
                </TableCell> {/* Add Action cell */}
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={Object.keys(formData).length + 1} // Adjust colspan to include the Action column
                align="center"
              >
                No records available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModelGenerationTables;
