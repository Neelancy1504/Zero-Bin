import { Box, Button, Card, Grid, Typography } from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: <RecyclingIcon sx={{ fontSize: 40 }} />,
    title: "Waste Management",
    description: "Smart recycling solutions for businesses and individuals",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: "Pickup Service",
    description: "Scheduled pickups at your convenience",
  },
  {
    icon: <InventoryIcon sx={{ fontSize: 40 }} />,
    title: "Inventory Tracking",
    description: "Real-time tracking of your recyclable inventory",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
    title: "Business Connect",
    description: "Connect with recycling businesses directly",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    title: "Community Impact",
    description: "Make a positive impact on your local community",
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 40 }} />,
    title: "Best Value",
    description: "Get the best value for your recyclable materials",
  },
];

const ServiceCard = ({ icon, title, description }) => (
  <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 4,
      textAlign: "center",
      background: "rgba(0, 0, 0, 0.6)",
      border: "1px solid rgba(0, 255, 149, 0.1)",
      borderRadius: 4,
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 0 20px rgba(0, 255, 149, 0.3)",
        border: "1px solid rgba(0, 255, 149, 0.5)",
        "& .icon": {
          color: "#00ff95",
          textShadow: "0 0 20px rgba(0, 255, 149, 0.5)",
        },
      },
    }}
  >
    <Box
      className="icon"
      sx={{
        color: "rgba(255, 255, 255, 0.8)",
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
        background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {title}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: "rgba(255, 255, 255, 0.7)",
      }}
    >
      {description}
    </Typography>
  </Card>
);

const Services = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
      }}
    >
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
        Our Services
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Button
          variant="outlined"
          size="large"
          sx={{
            transition: "all 0.3s ease-in-out",
            px: 6,
            py: 1.5,
          }}
          onClick={() => navigate("/services")}
        >
          GET STARTED
        </Button>
      </Box>
    </Box>
  );
};

export default Services;
