

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Alert,
} from "@mui/material";
import axios from "axios";
import supabase from "../../helpers/supabase";

const ShiprocketPickupBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    location: recyclingCenter,
    deliveryPincode,
    recyclingCenterName,
    recyclingCenterAddress,
    recyclingCenterId,
  } = location.state || {};

  const [formData, setFormData] = useState({
    pickupAddress: "",
    pickupPincode: "",
    deliveryPincode: deliveryPincode || "",
    date: "",
    timeSlot: "",
    weight: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shippingCost, setShippingCost] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Ensure user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        navigate("/login", { state: { returnTo: location.pathname } });
      }
    };
    checkAuth();
  }, [navigate, location.pathname]);

  // Pre-fill delivery pincode if available
  useEffect(() => {
    if (recyclingCenter) {
      setFormData((prev) => ({
        ...prev,
        deliveryPincode: deliveryPincode || prev.deliveryPincode,
      }));
    }
  }, [recyclingCenter, deliveryPincode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateShippingCost = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU3NjQwMTksInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzM5MTA4NjUzLCJqdGkiOiJzRkhuM21LcTRPWG5EQnp3IiwiaWF0IjoxNzM4MjQ0NjUzLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczODI0NDY1MywiY2lkIjo1NTU1NTk5LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.OCuSn95j66baZpjwgjRcsMb8c8RE9tdNwKfc0JqxCiQ";

      const response = await axios.get(
        "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
        {
          params: {
            pickup_postcode: formData.pickupPincode,
            delivery_postcode: formData.deliveryPincode,
            cod: 0,
            weight: formData.weight,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        const cost =
          response.data.data.available_courier_companies[0]?.rate || null;
        setShippingCost(cost);
        setShowConfirmation(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
      setError("Failed to calculate shipping cost. Please try again.");
      return false;
    }
  };

  const onSubmit = async () => {
    if (
      !formData.pickupAddress ||
      !formData.pickupPincode ||
      !formData.deliveryPincode ||
      !formData.date ||
      !formData.timeSlot ||
      !formData.weight
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const pickup = {
        user_id: user.id,
        recycling_center_id: recyclingCenterId,
        recycling_center_name: recyclingCenterName,
        recycling_center_address: recyclingCenterAddress,
        pickup_address: formData.pickupAddress,
        pickup_pincode: formData.pickupPincode,
        delivery_pincode: formData.deliveryPincode,
        pickup_date: formData.date,
        pickup_timeslot: formData.timeSlot,
        weight: formData.weight,
        shipping_cost: shippingCost,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      const { data, error: insertError } = await supabase
        .from("pickups_sr")
        .insert([pickup]);

      if (insertError) throw insertError;

      alert("Pickup scheduled successfully!");
      navigate("/pickuplist");
    } catch (error) {
      console.error("Error scheduling pickup:", error);
      setError(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Disable dates before today
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        padding: 2,
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
        <CardHeader title="Schedule Shiprocket Pickup" />
        <CardContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="h6" sx={{ mb: 2 }}>
              Arranging Pickup from: {recyclingCenter?.name}
            </Typography>

            <TextField
              label="Pickup Address"
              variant="outlined"
              name="pickupAddress"
              value={formData.pickupAddress}
              onChange={handleInputChange}
              required
              multiline
              rows={2}
            />

            <TextField
              label="Pickup Pincode"
              variant="outlined"
              name="pickupPincode"
              value={formData.pickupPincode}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Weight (kg)"
              type="number"
              variant="outlined"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />

            <TextField
              label="Select Date"
              type="date"
              variant="outlined"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleInputChange}
              required
              inputProps={{ min: minDate }}
            />

            <FormControl variant="outlined" required fullWidth>
              <InputLabel>Time Slot</InputLabel>
              <Select
                name="timeSlot"
                value={formData.timeSlot}
                label="Time Slot"
                onChange={handleInputChange}
              >
                <MenuItem value="morning">Morning (8am-12pm)</MenuItem>
                <MenuItem value="afternoon">Afternoon (12pm-4pm)</MenuItem>
                <MenuItem value="evening">Evening (4pm-8pm)</MenuItem>
              </Select>
            </FormControl>

            {shippingCost && (
              <Typography variant="h6">
                Shipping Cost: ₹{shippingCost}
              </Typography>
            )}

            {!showConfirmation ? (
              <Button
                variant="contained"
                color="primary"
                onClick={calculateShippingCost}
                disabled={loading}
                sx={{
                  bgcolor: "#4CAF50",
                  "&:hover": {
                    bgcolor: "#388E3C",
                  },
                }}
              >
                {loading ? "Calculating..." : "Get Quotation"}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmit}
                disabled={loading}
                sx={{
                  bgcolor: "#4CAF50",
                  "&:hover": {
                    bgcolor: "#388E3C",
                  },
                }}
              >
                {loading ? "Scheduling..." : "Confirm Pickup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShiprocketPickupBooking;
