// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
// } from "@mui/material";

// const dummyPickupData = [
//   {
//     id: 1,
//     address: "123 Green Street, Eco City",
//     date: "2024-03-15",
//     timeSlot: "Morning",
//     vehicleType: "2-wheeler",
//     status: "Completed",
//     totalCost: 50,
//   },
//   {
//     id: 2,
//     address: "456 Sustainability Avenue, Green Town",
//     date: "2024-03-16",
//     timeSlot: "Afternoon",
//     vehicleType: "truck",
//     status: "Pending",
//     totalCost: 200,
//   },
//   {
//     id: 3,
//     address: "789 Recycle Lane, Eco Village",
//     date: "2024-03-17",
//     timeSlot: "Evening",
//     vehicleType: "2-wheeler",
//     status: "Scheduled",
//     totalCost: 50,
//   },
// ];

// const PickupList = () => {
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "success";
//       case "Pending":
//         return "warning";
//       case "Scheduled":
//         return "primary";
//       default:
//         return "default";
//     }
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>Address</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Time Slot</TableCell>
//             <TableCell>Vehicle Type</TableCell>
//             <TableCell>Total Cost</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {dummyPickupData.map((pickup) => (
//             <TableRow key={pickup.id}>
//               <TableCell>{pickup.id}</TableCell>
//               <TableCell>{pickup.address}</TableCell>
//               <TableCell>{pickup.date}</TableCell>
//               <TableCell>{pickup.timeSlot}</TableCell>
//               <TableCell>{pickup.vehicleType}</TableCell>
//               <TableCell>${pickup.totalCost}</TableCell>
//               <TableCell>
//                 <Chip
//                   label={pickup.status}
//                   color={getStatusColor(pickup.status)}
//                   size="small"
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default PickupList;

import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

const dummyPickupData = [
  {
    id: 1,
    address: "123 Green Street, Eco City",
    date: "2024-03-15",
    timeSlot: "Morning",
    vehicleType: "2-wheeler",
    status: "Completed",
    totalCost: 50,
  },
  {
    id: 2,
    address: "456 Sustainability Avenue, Green Town",
    date: "2024-03-16",
    timeSlot: "Afternoon",
    vehicleType: "truck",
    status: "Pending",
    totalCost: 200,
  },
  {
    id: 3,
    address: "789 Recycle Lane, Eco Village",
    date: "2024-03-17",
    timeSlot: "Evening",
    vehicleType: "2-wheeler",
    status: "Scheduled",
    totalCost: 50,
  },
];

const PickupList = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Scheduled":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "99vw",
        display: "flex",
        flexDirection: "column",

        gap: 2,
        p: 2,
      }}
    >
      {dummyPickupData.map((pickup) => (
        <Card
          key={pickup.id}
          sx={{
            boxShadow: 3,
            transition: "transform 0.3s",
            borderRadius: 5,
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h6">{pickup.address}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {pickup.date} | Time: {pickup.timeSlot}
                </Typography>
                <Typography variant="body2">
                  Vehicle: {pickup.vehicleType} | Cost: ${pickup.totalCost}
                </Typography>
              </Box>
              <Chip
                label={pickup.status}
                color={getStatusColor(pickup.status)}
                size="small"
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PickupList;
