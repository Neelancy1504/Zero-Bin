import { Box, Button, Card, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

const ServiceCard = ({ icon, title, description }) => {
  return (
    <Card
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

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Debug log
    console.log("Location state:", location.state);
    
    if (location.state?.fromHeader === 'services') {
      // Delay showing the popup slightly to ensure rendering is complete
      setTimeout(() => {
        setOpenSnackbar(true);
        const element = document.getElementById('get-started');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [location.state]);

  const handleGetStartedClick = () => {
    const element = document.getElementById('get-started');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      id="services"
      sx={{
        py: 8,
        px: 2,
        position: 'relative',
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

      <Box 
        id="get-started"
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mt: 6,
          position: 'relative'
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            transition: "all 0.3s ease-in-out",
            px: 6,
            py: 1.5,
            background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
            color: "white",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(46, 125, 50, 0.25)",
            },
          }}
          onClick={() => navigate("/services")}
        >
          GET STARTED
        </Button>

        {/* Popup positioned relative to the button */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          sx={{
            position: 'absolute',
            bottom: '100%', // Position above the button
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '20px',
          }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            icon={<ArrowDownwardIcon />}
            sx={{
              backgroundColor: '#2E7D32',
              color: 'white',
              minWidth: '200px',
              display: 'flex',
              alignItems: 'center',
              '& .MuiAlert-icon': {
                color: 'white',
                fontSize: '24px',
                animation: 'bounce 1s infinite',
              },
              '& .MuiAlert-action': {
                color: 'white',
              },
              cursor: 'pointer',
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateY(0)',
                },
                '50%': {
                  transform: 'translateY(10px)',
                },
              },
            }}
            onClick={handleGetStartedClick}
          >
            Click here to get started!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Services;
