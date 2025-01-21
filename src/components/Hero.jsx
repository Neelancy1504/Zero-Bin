import { Box, Typography } from "@mui/material";
import FloatingIcons from "./FloatingIcons";

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        // padding: "2rem",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1F8E9 100%)",
        overflow: "hidden",

        width: "100vw",
        margin: 0,
        padding: 0,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        boxSizing: "border-box",
      }}
    >
      <FloatingIcons />
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.5rem", md: "4rem" },
          fontWeight: "bold",
          textAlign: "center",
          background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      >
        Your Waste is Someone's Gold
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          textAlign: "center",
          color: "#566573",
          maxWidth: "800px",
          position: "relative",
          zIndex: 1,
        }}
      >
        Join the movement for a cleaner, greener future
      </Typography>
    </Box>
  );
};

export default Hero;
