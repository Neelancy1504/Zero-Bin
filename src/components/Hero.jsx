import { Box, Typography } from "@mui/material";

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
        padding: "2rem",
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,20,20,1) 100%)",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.5rem", md: "4rem" },
          fontWeight: "bold",
          textAlign: "center",
          background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 0 20px rgba(0, 255, 149, 0.5)",
          animation: "glow 2s ease-in-out infinite alternate",
        }}
      >
        Your Waste is Someone's Gold
      </Typography>

      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.8)",
          maxWidth: "800px",
          textShadow: "0 0 10px rgba(0, 255, 149, 0.3)",
        }}
      >
        Secure your digital world with end-to-end encrypted messaging
      </Typography>
    </Box>
  );
};

export default Hero;
