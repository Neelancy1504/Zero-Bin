import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { keyframes } from "@mui/system";

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const OurTeam = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const teamMembers = [
    {
      name: "Neelancy Nain",
      image:
        "https://lh3.googleusercontent.com/pw/AP1GczO18cUFXGloaMwiiamLr-nYtjuOY3MG7PbhVCFB6s-ZK6XPHc_FJDX2pMq-ZRDthPcQI6tdVu-37VPo7W3ZJEwaGXtjmLI0tE_40F6dfKnRaAbBOkmQrssMPyThiQV5ZyWyTiRztno1p2nERaFTStLnmg=w665-h887-s-no-gm?authuser=0", // Replace with actual image path
      description: (
        <Typography sx={{ textAlign: "left" }}>
          I am a student at Maharaja Surajmal Institute of Technology With a
          keen interest in Web designing and development, I am dedicated to
          expanding my knowledge and skills in this ever-evolving field.
          <br />
          Looking to embark on a career where I can make meaningful
          contributions to technological advancements.
        </Typography>
      ),
      linkedIn: "https://www.linkedin.com/in/neelancy-nain-365ba5256/", // Replace with actual LinkedIn URL
    },
    {
      name: "Sahil Kumar",
      image:
        "https://lh3.googleusercontent.com/pw/AP1GczNnyinLAaRter4eCA6vIS2Ntks_plxKLxlYnn0rfgEsCSla8jQ7-ahUf0KPjOKSKGW5WFKn4NQOP8sXGkGbVGulmmqFFALjLrzqex-bhRy8kpNVRvCDzk-wkWg8sbwidnXhxZlctF9pIC-OAPDQ3X2q6Q=w591-h887-s-no-gm?authuser=0", // Replace with actual image path
      description: (
        <Typography sx={{ textAlign: "left" }}>
          I am a student at Maharaja Surajmal Institute of Technology and a
          skilled cross-platform developer specializing in React Native with
          backend expertise, currently serving as the Vice President of ISTE
          MSIT, demonstrating leadership and technical prowess in innovative
          software development.
        </Typography>
      ),
      linkedIn: "https://www.linkedin.com/in/sahil-kumar-b42a4a289/",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: 8 }} ref={sectionRef}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2E7D32",
          mb: 6,
        }}
      >
        Our Team
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              textAlign: "center",
              transition: "0.3s",
              borderRadius: "20px",
              backgroundColor: "#fff",

              boxShadow: "10px 10px",
              visibility: isVisible ? "visible" : "hidden",
              animation: isVisible
                ? `${
                    index === 0 ? slideInLeft : slideInRight
                  } 1s ease-out forwards`
                : "none",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 3,
              },
            }}
          >
            <Box
              component="img"
              src={member.image}
              alt={member.name}
              sx={{
                width: "100%",
                height: 300,
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {member.name}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ mb: 2 }}
              >
                {member.description}
              </Typography>
              <IconButton
                href={member.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#0077b5", // LinkedIn blue color
                  "&:hover": {
                    color: "#005885",
                  },
                }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default OurTeam;
