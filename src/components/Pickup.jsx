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
  Box,
} from "@mui/material";
import supabase from "../../helpers/supabase";
import { createPickup } from "../../services/PickupService";

const PickupBooking = () => {
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setloading] = useState("");

  const onSubmit = async () => {
    if (!address || !date || !timeSlot || !vehicleType) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setloading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const pickup = {
        address,
        date,
        timeslot: timeSlot,
        vehicle: vehicleType,
        userid: user.id,
      };

      const result = await createPickup(pickup);

      if (result.success) {
        alert("Pickup scheduled successfully!");
      } else {
        alert("Failed to schedule pickup: " + result.msg);
      }
    } catch (error) {
      console.error("Error scheduling pickup:", error);
      alert("Failed to schedule pickup");
    } finally {
      setloading(false);
    }
  };

  const PRICING = {
    "2-wheeler": 50,
    truck: 200,
  };

  const calculateTotalCost = () => {
    return vehicleType ? PRICING[vehicleType] : 0;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Card
        sx={{
          flex: 1,
          maxWidth: 400,
          margin: "auto",
          padding: 2,
          marginTop: "5%",
        }}
      >
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
              Total Cost: ₹{calculateTotalCost()}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={!address || !date || !timeSlot || !vehicleType}
            >
              Confirm Pickup
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PickupBooking;
