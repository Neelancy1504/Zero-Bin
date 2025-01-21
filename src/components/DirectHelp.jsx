import { Box, Button, Card, Grid, Typography } from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
// import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
// import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useNavigate } from "react-router-dom";

const services = [
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
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    title: "Community Impact",
    description: "Make a positive impact on your local community",
  },
];

const ServiceCard = ({ icon, title, description }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate('/service', { state: { title } })}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        textAlign: "center",
        background: "#FFFFFF",
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

const DirectHelp = () => {
  return (
    <Box
      id="direct-help"
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
          background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Direct Help
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

export default DirectHelp;
