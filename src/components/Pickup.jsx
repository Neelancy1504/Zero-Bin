import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const PickupBooking = () => {
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const PRICING = {
    "2-wheeler": 50,
    truck: 200,
  };

  const calculateTotalCost = () => {
    return vehicleType ? PRICING[vehicleType] : 0;
  };

  const handleConfirmPickup = () => {
    if (!address || !date || !timeSlot || !vehicleType) {
      alert("Please fill in all fields");
      return;
    }
    // Simulate booking submission
    alert(
      `Pickup Confirmed!\nAddress: ${address}\nDate: ${date}\nTime: ${timeSlot}\nVehicle: ${vehicleType}\nTotal Cost: $${calculateTotalCost()}`
    );
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <CardHeader title="Schedule Pickup" />
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField
            label="Enter Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            label="Select Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel>Time Slot</InputLabel>
            <Select
              value={timeSlot}
              label="Time Slot"
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <MenuItem value="morning">Morning (8am-12pm)</MenuItem>
              <MenuItem value="afternoon">Afternoon (12pm-4pm)</MenuItem>
              <MenuItem value="evening">Evening (4pm-8pm)</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" fullWidth>
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              value={vehicleType}
              label="Vehicle Type"
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <MenuItem value="2-wheeler">2-Wheeler</MenuItem>
              <MenuItem value="truck">Truck</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6">
            Total Cost: ${calculateTotalCost()}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmPickup}
            disabled={!address || !date || !timeSlot || !vehicleType}
          >
            Confirm Pickup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PickupBooking;
