import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { styled } from "@mui/material/styles";
import CustomTooltip from "../../common/CustomTooltip";
// import { StyledTableCell, StyledTableRow } from "../StyledTableComponents";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "16px",
    // backgroundColor: "#2d4ef5",
    // color: theme.palette.primary.contrastText,

    backgroundColor: "white",
    color: "black",
    textAlign: "center", // Ensure center alignment
    whiteSpace: "nowrap", // Prevent wrapping
}));

const StyledTableRow = styled(TableRow)(({ theme, isEven }) => ({
    // backgroundColor: isEven ? theme.palette.action.hover : "#fff",
    '&:hover': {
        backgroundColor: 'lavender', // Hover color for table cells
    },
}));
const ProductDepositTable = ({ data, formData, handleEdit, handleDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 2,
        overflowX: "auto",
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(formData)
              .filter((key) => key !== "id")
              .map((key) => (
                <StyledTableCell key={key} align="center">
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </StyledTableCell>
              ))}
            <StyledTableCell align="center">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <StyledTableRow key={index}>
                {Object.keys(formData)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <TableCell key={key} align="center">
                      {item[key]}
                    </TableCell>
                  ))}
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <CustomTooltip title="Edit record" arrow>
                      <Button
                        color="primary"
                        onClick={() => handleEdit(item)}
                        sx={{ minWidth: "36px", padding: "6px", color: "#2d4ef5" }}
                      >
                        <EditIcon />
                      </Button>
                    </CustomTooltip>
                    <CustomTooltip title="Delete record" arrow>
                      <Button
                        color="error"
                        onClick={() => handleDelete(item.id)}
                        sx={{ minWidth: "36px",
                        padding: "6px",
                        marginLeft: "-13px" }}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </CustomTooltip>
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={Object.keys(formData).length + 1}
                align="center"
                sx={{ fontStyle: "italic", color: "gray" }}
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

export default ProductDepositTable;
