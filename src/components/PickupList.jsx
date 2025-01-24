import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import supabase from "../../helpers/supabase";

const PickupList = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPickups = async () => {
      try {
        // Get current user
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData.user.id;

        // Fetch pickups for the current user
        const { data, error } = await supabase
          .from("pickup")
          .select("*")
          .eq("userid", userId);

        if (error) throw error;

        setPickups(data);
      } catch (error) {
        console.error("Error fetching pickups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPickups();
  }, []);

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

  if (loading) return <Typography>Loading pickups...</Typography>;

  if (pickups.length === 0) {
    return <Typography>No pickups found</Typography>;
  }

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
      {pickups.map((pickup) => (
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
                  Date: {pickup.date} | Time: {pickup.timeslot}
                </Typography>
                <Typography variant="body2">
                  Vehicle: {pickup.vehicle}
                </Typography>
              </Box>
              <Chip label="Scheduled" color="primary" size="small" />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PickupList;
