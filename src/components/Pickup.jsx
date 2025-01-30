// deepseek import React, { useState } from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";
// import supabase from "../../helpers/supabase";
// import { createPickup } from "../../services/PickupService";

// const PickupBooking = () => {
//   const location = useLocation(); // Now this will work
//   const { location: recyclingCenter } = location.state || {};

//   const [address, setAddress] = useState("");
//   const [date, setDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [vehicleType, setVehicleType] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async () => {
//     if (!address || !date || !timeSlot || !vehicleType) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       const pickup = {
//         address,
//         date,
//         timeslot: timeSlot,
//         vehicle: vehicleType,
//         userid: user.id,
//         recycling_center_id: recyclingCenter?.place_id, // Include recycling center ID
//         recycling_center_name: recyclingCenter?.name, // Include recycling center name
//       };

//       const result = await createPickup(pickup);

//       if (result.success) {
//         alert("Pickup scheduled successfully!");
//         setAddress("");
//         setDate("");
//         setTimeSlot("");
//         setVehicleType("");
//       } else {
//         alert("Failed to schedule pickup: " + result.msg);
//       }
//     } catch (error) {
//       console.error("Error scheduling pickup:", error);
//       alert("Failed to schedule pickup");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const PRICING = {
//     "2-wheeler": 50,
//     truck: 200,
//   };

//   const calculateTotalCost = () => {
//     return vehicleType ? PRICING[vehicleType] : 0;
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 2,
//       }}
//     >
//       <Card
//         sx={{
//           flex: 1,
//           maxWidth: 400,
//           margin: "auto",
//           padding: 2,
//           marginTop: "5%",
//         }}
//       >
//         <CardHeader title="Schedule Pickup" />
//         <CardContent>
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Arranging Pickup from: {recyclingCenter?.name}
//             </Typography>

//             <TextField
//               label="Enter Address"
//               variant="outlined"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />

//             <TextField
//               label="Select Date"
//               type="date"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />

//             <FormControl variant="outlined" fullWidth>
//               <InputLabel>Time Slot</InputLabel>
//               <Select
//                 value={timeSlot}
//                 label="Time Slot"
//                 onChange={(e) => setTimeSlot(e.target.value)}
//               >
//                 <MenuItem value="morning">Morning (8am-12pm)</MenuItem>
//                 <MenuItem value="afternoon">Afternoon (12pm-4pm)</MenuItem>
//                 <MenuItem value="evening">Evening (4pm-8pm)</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl variant="outlined" fullWidth>
//               <InputLabel>Vehicle Type</InputLabel>
//               <Select
//                 value={vehicleType}
//                 label="Vehicle Type"
//                 onChange={(e) => setVehicleType(e.target.value)}
//               >
//                 <MenuItem value="2-wheeler">2-Wheeler</MenuItem>
//                 <MenuItem value="truck">Truck</MenuItem>
//               </Select>
//             </FormControl>

//             <Typography variant="h6">
//               Total Cost: ₹{calculateTotalCost()}
//             </Typography>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={onSubmit}
//               disabled={!address || !date || !timeSlot || !vehicleType}
//             >
//               Confirm Pickup
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PickupBooking;
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
//   Alert,
// } from "@mui/material";
// import supabase from "../../helpers/supabase";
// import { createPickup } from "../../services/PickupService";

// const PickupBooking = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { location: recyclingCenter } = location.state || {};

//   const [address, setAddress] = useState("");
//   const [date, setDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [vehicleType, setVehicleType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Ensure user is authenticated
//   useEffect(() => {
//     const checkAuth = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();
//       if (error || !user) {
//         navigate("/login", { state: { returnTo: location.pathname } });
//       }
//     };
//     checkAuth();
//   }, [navigate, location.pathname]);

//   // Ensure recycling center data is available
//   useEffect(() => {
//     if (!recyclingCenter) {
//       navigate("/centers");
//     }
//   }, [recyclingCenter, navigate]);

//   const onSubmit = async () => {
//     if (!address || !date || !timeSlot || !vehicleType) {
//       setError("Please fill in all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       const pickup = {
//         address,
//         date,
//         timeslot: timeSlot,
//         vehicle: vehicleType,
//         userid: user.id,
//         recycling_center_id: recyclingCenter?.place_id,
//         recycling_center_name: recyclingCenter?.name,
//         status: "pending", // Add initial status
//         created_at: new Date().toISOString(),
//       };

//       const result = await createPickup(pickup);

//       if (result.success) {
//         alert("Pickup scheduled successfully!");
//         navigate("/dashboard"); // Redirect to dashboard after success
//       } else {
//         setError(result.msg || "Failed to schedule pickup");
//       }
//     } catch (error) {
//       console.error("Error scheduling pickup:", error);
//       setError("An unexpected error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const PRICING = {
//     "2-wheeler": 50,
//     truck: 200,
//   };

//   const calculateTotalCost = () => {
//     return vehicleType ? PRICING[vehicleType] : 0;
//   };

//   // Disable dates before today
//   const minDate = new Date().toISOString().split("T")[0];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 2,
//         padding: 2,
//       }}
//     >
//       <Card
//         sx={{
//           flex: 1,
//           maxWidth: 400,
//           margin: "auto",
//           padding: 2,
//           marginTop: "5%",
//         }}
//       >
//         <CardHeader title="Schedule Pickup" />
//         <CardContent>
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Arranging Pickup from: {recyclingCenter?.name}
//             </Typography>

//             <TextField
//               label="Enter Address"
//               variant="outlined"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               multiline
//               rows={2}
//             />

//             <TextField
//               label="Select Date"
//               type="date"
//               variant="outlined"
//               InputLabelProps={{ shrink: true }}
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               inputProps={{ min: minDate }}
//             />

//             <FormControl variant="outlined" required fullWidth>
//               <InputLabel>Time Slot</InputLabel>
//               <Select
//                 value={timeSlot}
//                 label="Time Slot"
//                 onChange={(e) => setTimeSlot(e.target.value)}
//               >
//                 <MenuItem value="morning">Morning (8am-12pm)</MenuItem>
//                 <MenuItem value="afternoon">Afternoon (12pm-4pm)</MenuItem>
//                 <MenuItem value="evening">Evening (4pm-8pm)</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl variant="outlined" required fullWidth>
//               <InputLabel>Vehicle Type</InputLabel>
//               <Select
//                 value={vehicleType}
//                 label="Vehicle Type"
//                 onChange={(e) => setVehicleType(e.target.value)}
//               >
//                 <MenuItem value="2-wheeler">2-Wheeler</MenuItem>
//                 <MenuItem value="truck">Truck</MenuItem>
//               </Select>
//             </FormControl>

//             <Typography variant="h6">
//               Total Cost: ₹{calculateTotalCost()}
//             </Typography>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={onSubmit}
//               disabled={
//                 loading || !address || !date || !timeSlot || !vehicleType
//               }
//             >
//               {loading ? "Scheduling..." : "Confirm Pickup"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PickupBooking;

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
import supabase from "../../helpers/supabase";
import { createPickup } from "../../services/PickupService";

const PickupBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { location: recyclingCenter } = location.state || {};

  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // Ensure recycling center data is available
  useEffect(() => {
    if (!recyclingCenter) {
      navigate("/centers");
    }
  }, [recyclingCenter, navigate]);

  // const onSubmit = async () => {
  //   if (!address || !date || !timeSlot || !vehicleType) {
  //     setError("Please fill in all fields");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError("");
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     const pickup = {
  //       userid: user.id,
  //       recycling_center_id: recyclingCenter?.place_id,
  //       recycling_center_name: recyclingCenter?.name,
  //       recycling_center_address:
  //         recyclingCenter?.formatted_address || recyclingCenter?.vicinity,
  //       address,
  //       date,
  //       timeslot: timeSlot,
  //       vehicle: vehicleType,
  //     };

  //     const result = await createPickup(pickup);

  //     if (result.success) {
  //       alert("Pickup scheduled successfully!");
  //       navigate("/dashboard"); // Redirect to dashboard after success
  //     } else {
  //       setError(result.msg || "Failed to schedule pickup");
  //     }
  //   } catch (error) {
  //     console.error("Error scheduling pickup:", error);
  //     setError("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const onSubmit = async () => {
  //   if (!address || !date || !timeSlot || !vehicleType) {
  //     setError("Please fill in all fields");
  //     return;
  //   }

  //   // Ensure recycling_center_id is not null
  //   if (!recyclingCenter?.place_id) {
  //     setError("Invalid recycling center. Please select a valid center.");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError("");
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     const pickup = {
  //       userid: user.id,
  //       recycling_center_id: recyclingCenter.place_id, // Ensure this is not null
  //       recycling_center_name: recyclingCenter?.name,
  //       recycling_center_address:
  //         recyclingCenter?.formatted_address || recyclingCenter?.vicinity,
  //       address,
  //       date,
  //       timeslot: timeSlot,
  //       vehicle: vehicleType,
  //     };

  //     console.log("Pickup Data:", pickup); // Debugging: Log pickup data

  //     const result = await createPickup(pickup);

  //     if (result.success) {
  //       alert("Pickup scheduled successfully!");
  //       navigate("/dashboard"); // Redirect to dashboard after success
  //     } else {
  //       setError(result.msg || "Failed to schedule pickup");
  //     }
  //   } catch (error) {
  //     console.error("Error scheduling pickup:", error);
  //     setError("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async () => {
    if (!address || !date || !timeSlot || !vehicleType) {
      setError("Please fill in all fields");
      console.error("Validation Error: Missing required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Debugging: Log recycling center data
      console.log("Recycling Center Object:", recyclingCenter);

      const pickup = {
        userid: user.id,
        recycling_center_id: recyclingCenter?.place_id || null, // Allow null
        recycling_center_name: recyclingCenter?.name || null,
        recycling_center_address:
          recyclingCenter?.formatted_address ||
          recyclingCenter?.vicinity ||
          null,
        address,
        date,
        timeslot: timeSlot,
        vehicle: vehicleType,
      };

      console.log("Pickup Data:", pickup); // Debugging: Log pickup data

      const result = await createPickup(pickup);

      if (result.success) {
        console.log("Pickup scheduled successfully:", result);
        alert("Pickup scheduled successfully!");
        navigate("/dashboard"); // Redirect to dashboard after success
      } else {
        console.error("Pickup scheduling failed:", result);
        console.error("Error message:", result.msg || "Unknown error");
        setError(result.msg || "Failed to schedule pickup");
      }
    } catch (error) {
      console.error("Error scheduling pickup:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
      }
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const PRICING = {
    "2-wheeler": 50,
    truck: 200,
  };

  const calculateTotalCost = () => {
    return vehicleType ? PRICING[vehicleType] : 0;
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
        <CardHeader title="Schedule Pickup" />
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
              label="Enter Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              multiline
              rows={2}
            />

            <TextField
              label="Select Date"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              inputProps={{ min: minDate }}
            />

            <FormControl variant="outlined" required fullWidth>
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

            <FormControl variant="outlined" required fullWidth>
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
              disabled={
                loading || !address || !date || !timeSlot || !vehicleType
              }
            >
              {loading ? "Scheduling..." : "Confirm Pickup"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PickupBooking;
