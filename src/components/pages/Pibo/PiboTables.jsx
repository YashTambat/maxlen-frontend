import React from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import CustomTooltip from "../../common/CustomTooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { StyledTableCell, StyledTableRow } from "../StyledTableComponents"; // Assuming styled components are imported

const PiboTables = ({data, formData, handleEdit, handleDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(formData)
              .filter(
                (key) =>
                  key !== "id" &&
                  key !== "pinCode" &&
                  key !== "password" &&
                  key !== "confirmpassword" &&
                  key !== "companyLegalName" &&
                  key !== "cin" &&
                  key !== "companyPan" &&
                  key !== "companyPanLegalName" &&
                  key !== "companyPanLegalFatherName" &&
                  key !== "dateOfIncorporation" &&
                  key !== "personName" &&
                  key !== "personReservedNumber" &&
                  key !== "personPan" &&
                  key !== "personPanName" &&
                  key !== "personPanFatherName" &&
                  key !== "personPanDateOfBirth" &&
                  key !== "gst" &&
                  key !== "tan" &&
                  key !== "licenseNo" &&
                  key !== "otherInformation" &&
                  key !== "userView" &&
                  key !== "fileModel" &&
                  key !== "name" &&
                  key !== "personMobileNum" &&
                  key !== "mobile" &&
                  key !== "email"
              )
              .map((key) => (
                <StyledTableCell key={key}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </StyledTableCell>
              ))}
            <StyledTableCell>ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <StyledTableRow key={index} >
                {Object.keys(formData)
                  .filter(
                    (key) =>
                      key !== "id" &&
                      key !== "pinCode" &&
                      key !== "password" &&
                      key !== "confirmpassword" &&
                      key !== "companyLegalName" &&
                      key !== "cin" &&
                      key !== "companyPan" &&
                      key !== "companyPanLegalName" &&
                      key !== "companyPanLegalFatherName" &&
                      key !== "dateOfIncorporation" &&
                      key !== "personName" &&
                      key !== "personReservedNumber" &&
                      key !== "personPan" &&
                      key !== "personPanName" &&
                      key !== "personPanFatherName" &&
                      key !== "personPanDateOfBirth" &&
                      key !== "gst" &&
                      key !== "tan" &&
                      key !== "licenseNo" &&
                      key !== "otherInformation" &&
                      key !== "userView" &&
                      key !== "fileModel" &&
                      key !== "name" &&
                      key !== "personMobileNum" &&
                      key !== "mobile" &&
                      key !== "email"
                  )
                  .map((key) => (
                    <TableCell key={key}>{item[key]}</TableCell>
                  ))}
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <CustomTooltip title="Edit record" arrow>
                      <Button
                        // variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(item)}
                        sx={{ minWidth: "36px", padding: "6px" ,color:"#2d4ef5",marginLeft:"-10px"}}
                      >
                        <EditIcon />
                      </Button>
                    </CustomTooltip>

                    <CustomTooltip title="Delete record" arrow>
                      <Button
                        // variant="outlined"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                        sx={{ minWidth: "36px", padding: "6px" , marginLeft:"-10px"}}
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

export default PiboTables;
