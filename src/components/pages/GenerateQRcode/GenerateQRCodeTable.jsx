import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, Box, Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CustomTooltip from "../../common/CustomTooltip";
import LoadingBackdrop from "../../common/LoadingBackdrop";

const GenerateQRCodeTable = ({ data, isLoading, handleView, handleDownload, handleReceipt, StyledTableCell, StyledTableRow, showForm }) => {
  if (showForm) return null;
  
  return (
    isLoading ? (
      <LoadingBackdrop isOpen={isLoading} />
    ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["PRODUCT NAME", "PACKING TYPE", "DEPOSIT", "NO.PACKAGES", "TOTAL DEPOSIT", "ORDER ID", "ROZARPAY ID", "PAYMENT ID", "PAYMENT STATUS", "FORMAT", "ACTION"].map(
                (header, index) => (
                  <StyledTableCell key={index}>{header}</StyledTableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>{item.modelGenerationView.productName}</TableCell>
                  <TableCell>{item.modelGenerationView.productPackingType}</TableCell>
                  <TableCell>{item.modelGenerationView.packagingView.deposit}</TableCell>
                  <TableCell>{item.qrCodeModel.numberOfPackages}</TableCell>
                  <TableCell>{item.qrCodeModel.totalDeposit}</TableCell>
                  <TableCell>{item.orderId}</TableCell>
                  <TableCell>{item.rozarpayId}</TableCell>
                  <TableCell>{item.paymentId ? item.paymentId : "null"}</TableCell>
                  <TableCell>{item.paymentStatus ? item.paymentStatus : "null"}</TableCell>
                  <TableCell>{item.qrCodeModel.qrCodeFormat}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      <CustomTooltip title="view record">
                        <Button onClick={() => handleView(item)} sx={{ minWidth: "36px", padding: "6px", color: "#2d4ef5", marginLeft: "-10px" }}>
                          <RemoveRedEyeIcon sx={{ fontSize: 18 }} />
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip title="Download QR Code" arrow>
                        <Button onClick={() => handleDownload(item)} sx={{ minWidth: "36px", padding: "6px", color: "#2d4ef5", marginLeft: "-10px" }}>
                          <DownloadIcon />
                        </Button>
                      </CustomTooltip>
                      <CustomTooltip title="Download Receipt" arrow>
                        <Button onClick={() => handleReceipt(item)} sx={{ minWidth: "36px", padding: "6px", color: "#2d4ef5", marginLeft: "-10px" }}>
                          <ReceiptIcon />
                        </Button>
                      </CustomTooltip>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ fontStyle: "italic", color: "gray" }}>
                  No records available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default GenerateQRCodeTable;
