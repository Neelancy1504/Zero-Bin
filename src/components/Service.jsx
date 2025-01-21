import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Mock data for nearby recycling locations
const mockLocations = [
  {
    id: 1,
    name: "Green Recyclers",
    image: "https://source.unsplash.com/400x300/?recycling",
    distance: "1.2 km",
    address: "123 Green Street, Eco City",
    phone: "+1 234-567-8900",
    email: "contact@greenrecyclers.com",
    rating: 4.5,
    openHours: "9:00 AM - 6:00 PM",
  },
  {
    id: 2,
    name: "EcoHub Center",
    image: "https://source.unsplash.com/400x300/?waste",
    distance: "2.5 km",
    address: "456 Earth Avenue, Eco City",
    phone: "+1 234-567-8901",
    email: "info@ecohub.com",
    rating: 4.8,
    openHours: "8:00 AM - 8:00 PM",
  },
  {
    id: 3,
    name: "Recycle Pro",
    image: "https://source.unsplash.com/400x300/?environment",
    distance: "3.7 km",
    address: "789 Sustainability Road, Eco City",
    phone: "+1 234-567-8902",
    email: "hello@recyclepro.com",
    rating: 4.2,
    openHours: "10:00 AM - 7:00 PM",
  },
];

const LocationCard = ({ location }) => (
  <Card
    sx={{
      display: "flex",
      mb: 3,
      background: "rgba(0, 0, 0, 0.6)",
      border: "1px solid rgba(0, 255, 149, 0.1)",
      borderRadius: 4,
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0 0 20px rgba(0, 255, 149, 0.2)",
        border: "1px solid rgba(0, 255, 149, 0.3)",
      },
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 200 }}
      image={location.image}
      alt={location.name}
    />
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {location.name}
          </Typography>
          <Chip
            icon={<LocationOnIcon />}
            label={location.distance}
            sx={{
              background: "rgba(0, 255, 149, 0.1)",
              border: "1px solid rgba(0, 255, 149, 0.3)",
            }}
          />
        </Box>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            <LocationOnIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.address}
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            <PhoneIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.phone}
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            <EmailIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.email}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DirectionsIcon />}
            sx={{
              borderColor: "rgba(0, 255, 149, 0.3)",
              color: "#00ff95",
              "&:hover": {
                borderColor: "#00ff95",
                boxShadow: "0 0 10px rgba(0, 255, 149, 0.3)",
              },
            }}
          >
            Get Directions
          </Button>
          <Button
            variant="contained"
            startIcon={<LocalShippingIcon />}
            sx={{
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              color: "#000",
              "&:hover": {
                boxShadow: "0 0 15px rgba(0, 255, 149, 0.5)",
              },
            }}
          >
            Schedule Pickup
          </Button>
        </Box>
      </CardContent>
    </Box>
  </Card>
);

const Service = () => {
  const location = useLocation();
  const { title } = location.state || { title: "Recycling Service" };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        py: 8,
        px: 4,
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,20,20,1) 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(0, 255, 149, 0.3)",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
          }}
        >
          Recycling Locations Near You
        </Typography>

        <Box>
          {mockLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Service;
