import { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Card,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import DescriptionIcon from "@mui/icons-material/Description";
import DevicesIcon from "@mui/icons-material/Devices";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ChairIcon from "@mui/icons-material/Chair";
import BuildIcon from "@mui/icons-material/Build";
import { useNavigate } from "react-router-dom";

const recycleServices = [
  {
    icon: <BatteryChargingFullIcon sx={{ fontSize: 40 }} />,
    title: "Batteries",
    description: "Recycle all types of batteries",
  },
  {
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    title: "Paper",
    description: "Paper, cardboard, and documents",
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 40 }} />,
    title: "Electronics",
    description: "E-waste and electronic devices",
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
    title: "Food Waste",
    description: "Organic and food waste",
  },
  {
    icon: <CheckroomIcon sx={{ fontSize: 40 }} />,
    title: "Clothing",
    description: "Textiles and clothing items",
  },
  {
    icon: <AutorenewIcon sx={{ fontSize: 40 }} />,
    title: "Plastics",
    description: "All types of plastic materials",
  },
  {
    icon: <ChairIcon sx={{ fontSize: 40 }} />,
    title: "Furniture",
    description: "Used and old furniture",
  },
  {
    icon: <BuildIcon sx={{ fontSize: 40 }} />,
    title: "Metal",
    description: "Scrap metal and metallic items",
  },
];

const ServiceCard = ({ icon, title, description }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate("/service", { state: { title } })}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
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
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: "bold",
          color: "#2E7D32",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#566573",
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

const Selection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = recycleServices.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        minHeight: "90vh",
        py: 8,
        px: 4,
        background: "#FFFFFF",
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
        What are we Recycling Today?
      </Typography>

      <Box sx={{ maxWidth: 600, mx: "auto", mb: 6 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "rgba(0, 255, 149, 0.5)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(0, 255, 149, 0.2)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0, 255, 149, 0.4)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00ff95",
              },
            },
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredServices.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Selection;
