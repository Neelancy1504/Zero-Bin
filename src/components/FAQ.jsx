import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          color: "#2E7D32",
          textAlign: "center",
          fontSize: "50px",
          fontWeight: "500"
        }}
      >
        Frequently Asked Questions
      </Typography>

      {/* FAQ Item 1 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq1-content"
          id="faq1-header"
        >
          <Typography variant="subtitle1">What is this platform about?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            This platform is designed to promote sustainability and provide tools for effective recycling. We aim to create a cleaner, greener future by empowering individuals and organizations.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ Item 2 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq2-content"
          id="faq2-header"
        >
          <Typography variant="subtitle1">How can I contribute to the mission?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            You can contribute by following proper recycling practices, sharing our platform with others, and supporting eco-friendly initiatives in your community.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* FAQ Item 3 */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="faq3-content"
          id="faq3-header"
        >
          <Typography variant="subtitle1">Is there a cost to use the platform?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">
            No, our platform is free to use for individuals. For organizations, we offer tailored solutions that may include premium features.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
