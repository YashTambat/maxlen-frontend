import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const SUB_BASE_URL = `${BASE_URL}/public/machine`;

const MachineQRCode = () => {
  // State variables
  const [machineId, setMachineId] = useState("");
  const [mode, setMode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Dummy Machine IDs (Replace with real API data)
  const machineOptions = ["TK42-0125-001", "TK42-0225-002"];
  const modeOptions = ["ELock", "Maintenance"];

  // Generate QR Code
  const handleGenerateQRCode = async () => {
    if (!machineId || !mode) {
      toast.error("Please select both Machine ID and Mode.");
      return;
    }

    // Get current epoch timestamp
    const epochTime = Math.floor(new Date().getTime() / 1000);

    try {
      const response = await axios.get(`${SUB_BASE_URL}/generate-qrcode`, {
        params: { machineId, mode, epochTime },
      });

      // Show Success Message
      toast.success(response.data.message);
      console.log("Response:", response.data);

      // Set QR Code URL
      setQrCodeUrl(response.data.fileUrl);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate QR Code.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      {/* Machine ID Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Machine ID</InputLabel>
        <Select
          value={machineId}
          label="machineId"
          onChange={(e) => setMachineId(e.target.value)}
        >
          {machineOptions.map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Mode Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Mode</InputLabel>
        <Select value={mode} label="mode" onChange={(e) => setMode(e.target.value)}>
          {modeOptions.map((mode) => (
            <MenuItem key={mode} value={mode}>
              {mode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Generate Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleGenerateQRCode}
      >
        Generate QR Code
      </Button>

      {/* Show QR Code Image */}
      {qrCodeUrl && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Generated QR Code:</h3>
          <img
            src={qrCodeUrl}
            alt="QR Code"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default MachineQRCode;
