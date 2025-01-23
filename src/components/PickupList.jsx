import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

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
