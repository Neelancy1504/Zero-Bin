import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useNavigate, useLocation } from "react-router-dom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const services = [
  {
    icon: <RecyclingIcon sx={{ fontSize: 40 }} />,
    title: "Waste Management",
    description: "Smart recycling solutions for businesses and individuals",
    bgcolor: "#FFFFFF",
    path: "/services",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: "Pickup Service",
    description: "Scheduled pickups at your convenience",
    bgcolor: "#FFFFFF",
    path: "/services",
  },
  {
    icon: <InventoryIcon sx={{ fontSize: 40 }} />,
    title: "PickUp Tracking",
    description: "Real-time tracking of your recyclable item",
    bgcolor: "#FFFFFF",
    path: "/pickuplist",
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    title: "Earn Ecopoints",
    description: "Earn Ecopoints and get amazing rewards",
    bgcolor: "#FFFFFF",
    path: "/ecopoints",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    title: "Community Impact",
    description: "Make a positive impact on your local community",
    bgcolor: "#FFFFFF",
    //path: "/service",
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 40 }} />,
    title: "Best Value",
    description: "Get the best value for your recyclable materials",
    bgcolor: "#FFFFFF",
    path: "/services",
  },
];

const ServiceCard = ({ icon, title, description, bgcolor, path }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(path);
  };
  return (
    <Card
      onClick={handleCardClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        textAlign: "center",
        background: bgcolor,
        border: "1px solid rgba(46, 125, 50, 0.12)",
        borderRadius: 4,
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
          "& .icon": {
            color: "#2E7D32",
          },
        },
      }}
    >
      <Box
        className="icon"
        sx={{
          //color: "black",
          color: "#4CAF50",
          mb: 2,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          //background: "black",
          background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#566573",
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Debug log
    console.log("Location state:", location.state);

    if (location.state?.fromHeader === "services") {
      // Delay showing the popup slightly to ensure rendering is complete
      setTimeout(() => {
        setOpenSnackbar(true);
        const element = document.getElementById("get-started");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location.state]);

  const handleGetStartedClick = () => {
    const element = document.getElementById("get-started");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      id="services"
      sx={{
        paddingTop: 5,
        px: 2,
        position: "relative",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 6,
          fontWeight: "bold",
          background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Our Services
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
