// import React from 'react';
// import { Typography, Box } from '@mui/material';

// const AboutUs = () => {
//   return (
//     <Box
//       sx={{
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Typography
//         variant="h1"
//         sx={{
//           color: "#0f870f",
//           marginBottom: "20px",
//           fontSize: "50px",
//           textAlign: "center",
//           fontWeight: 600
//         }}
//       >
//         About Us
//       </Typography>
//       <Typography
//         variant="body1"
//         sx={{
//           color: "#666",
//           maxWidth: "1000px",
//           textAlign: "justify",
//           lineHeight: "1.6",
//           fontSize: "20px",
//         }}
//       >
//         Welcome to our platform! We are dedicated to promoting sustainability
//         and making a positive impact on the environment. Our mission is to
//         provide innovative solutions that empower individuals and organizations
//         to recycle effectively and reduce waste. Together, we can create a
//         cleaner, greener future for generations to come.
//       </Typography>
//     </Box>

//   );
// };

// export default AboutUs;

//about.jsx

import React from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
} from "@mui/lab";
import {
  Assessment,
  EmojiObjects,
  Favorite,
  GroupWork,
  Psychology,
  RecyclingRounded,
} from "@mui/icons-material";

const AboutUs = () => {
  const companyValues = [
    {
      title: "Innovation",
      icon: <EmojiObjects />,
      description: "Constantly evolving and finding new solutions",
    },
    {
      title: "Sustainability",
      icon: <RecyclingRounded />,
      description: "Promoting eco-friendly practices",
    },
    {
      title: "Community",
      icon: <GroupWork />,
      description: "Building strong relationships",
    },
    {
      title: "Integrity",
      icon: <Favorite />,
      description: "Operating with honesty and transparency",
    },
    {
      title: "Excellence",
      icon: <Assessment />,
      description: "Striving for the highest quality",
    },
    {
      title: "Adaptability",
      icon: <Psychology />,
      description: "Flexible solutions for changing needs",
    },
  ];

  const statistics = [
    { number: "10K+", label: "Users Served" },
    { number: "50+", label: "Cities Covered" },
    { number: "100K+", label: "Tons Recycled" },
    { number: "95%", label: "Customer Satisfaction" },
  ];

  const timelineEvents = [
    {
      year: "2023",
      event: "Company Founded",
      description: "Started with a vision for better waste management",
    },
    {
      year: "2023",
      event: "First City Launch",
      description: "Successfully launched operations in our first city",
    },
    {
      year: "2024",
      event: "Mobile App Launch",
      description: "Introduced our innovative mobile application",
    },
    {
      year: "2024",
      event: "Regional Expansion",
      description: "Expanded to 50+ cities across the region",
    },
  ];

  return (
    <Container maxWidth="lg">
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
            color: "#00C49F",
            marginBottom: "20px",
            fontSize: "50px",
            textAlign: "center",
            fontWeight: 700,
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
          provide innovative solutions that empower individuals and
          organizations to recycle effectively and reduce waste. Together, we
          can create a cleaner, greener future for generations to come.
        </Typography>
      </Box>

      {/* Statistics Section */}
      <Box
        component="section"
        sx={{
          my: 6,
          py: 4,
          backgroundColor: "#00C49F", //'#0088FE',
          borderRadius: 10,
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {statistics.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "30px", md: "40px" },
                    fontWeight: 600,
                    marginBottom: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Timeline Section */}
      <Box component="section" sx={{ my: 6 }}>
        <Typography
          variant="h2"
          sx={{
            color: "#FFBB28",
            fontSize: { xs: "30px", md: "35px" },
            marginBottom: "30px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Our Journey
        </Typography>
        <Timeline position="alternate">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: "#0088FE" }} />
                {index !== timelineEvents.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} sx={{ p: 2, backgroundColor: "#FFBB28" }}>
                  <Typography variant="h6" sx={{ color: "black" }}>
                    {event.year}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {event.event}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {event.description}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>

      {/* Company Values Section */}
      <Box component="section" sx={{ my: 6 }}>
        <Typography
          variant="h2"
          sx={{
            color: "#ff758f",
            fontSize: { xs: "30px", md: "35px" },
            marginBottom: "30px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Our Values
        </Typography>
        <Grid container spacing={3}>
          {companyValues.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  bgcolor: "#ff758f",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box sx={{ color: "#fff", mb: 2 }}>{value.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 600, color: "#fff" }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutUs;
