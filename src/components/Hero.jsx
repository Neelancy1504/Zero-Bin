import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/back1.png";

const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fadeInScaleStyles = {
    animation: `fadeInScale 1.5s ease-in-out`,
    "@keyframes fadeInScale": {
      "0%": {
        opacity: 0,
        transform: "scale(0.9)",
      },
      "100%": {
        opacity: 1,
        transform: "scale(1)",
      },
    },
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%", // Changed from 99vw to 100%
        height: isMobile ? "auto" : "94vh",
        minHeight: isMobile ? "100vh" : "auto",
        overflow: "hidden",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: isMobile ? theme.spacing(2) : 0,
      }}
    >
      <Box
        sx={{
          ...fadeInScaleStyles,
          width: isMobile ? "100%" : "50%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(3),
          textAlign: "center",
          padding: isMobile ? theme.spacing(2) : theme.spacing(4),
          marginBottom: 30,
        }}
      >
        <Typography
          variant={isMobile ? "subtitle2" : "subtitle1"}
          sx={{
            color: "#32a137",
            fontWeight: 700,
          }}
        >
          Sustainability
        </Typography>

        <Typography
          variant={isMobile ? "h4" : "h2"}
          sx={{
            fontWeight: 600,
            color: "#333",
            lineHeight: 1.2,
          }}
        >
          The Planet Asks For{" "}
          <Box
            component="span"
            sx={{
              backgroundColor: "#32a137",
              color: "white",
              borderRadius: "10px",
              marginLeft: 1,
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
          >
            Positive
          </Box>
        </Typography>

        <Typography
          variant={isMobile ? "body2" : "body1"}
          sx={{
            color: "#666",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          ZeroBin is an innovative platform that transforms waste management by
          connecting individuals and businesses with recyclers and NGOs. It
          promotes sustainability by recycling, repurposing, and rewarding
          users, turning discarded materials into valuable resources while
          reducing environmental impact.
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#2E7D32",
            px: 4,
            py: 1.5,
            borderRadius: "20px",
            "&:hover": {
              bgcolor: "#1B5E20",
            },
          }}
          onClick={() => navigate("/services")}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
