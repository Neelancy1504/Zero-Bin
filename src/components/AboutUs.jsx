import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "#0f870f",
          marginBottom: "20px",
          fontSize: "50px",
          textAlign: "center",
          fontWeight: 600
        }}
      >
        About Us
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#666",
          maxWidth: "1000px",
          textAlign: "justify",
          lineHeight: "1.6",
          fontSize: "20px",
        }}
      >
        Welcome to our platform! We are dedicated to promoting sustainability
        and making a positive impact on the environment. Our mission is to
        provide innovative solutions that empower individuals and organizations
        to recycle effectively and reduce waste. Together, we can create a
        cleaner, greener future for generations to come.
      </Typography>
    </Box>

    
  );
};

export default AboutUs;
