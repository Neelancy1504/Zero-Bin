import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';


// Mock data for nearby recycling locations
const mockLocations = [
  {
    id: 1,
    name: "Green Recyclers",
    image: "https://source.unsplash.com/400x300/?recycling",
    distance: "1.2 km",
    address: "123 Green Street, Eco City",
    phone: "+1 234-567-8900",
    email: "contact@greenrecyclers.com",
    rating: 4.5,
    openHours: "9:00 AM - 6:00 PM",
  },
  {
    id: 2,
    name: "EcoHub Center",
    image: "https://source.unsplash.com/400x300/?waste",
    distance: "2.5 km",
    address: "456 Earth Avenue, Eco City",
    phone: "+1 234-567-8901",
    email: "info@ecohub.com",
    rating: 4.8,
    openHours: "8:00 AM - 8:00 PM",
  },
  {
    id: 3,
    name: "Recycle Pro",
    image: "https://source.unsplash.com/400x300/?environment",
    distance: "3.7 km",
    address: "789 Sustainability Road, Eco City",
    phone: "+1 234-567-8902",
    email: "hello@recyclepro.com",
    rating: 4.2,
    openHours: "10:00 AM - 7:00 PM",
  },
];

// Real Indian NGO data
const realNGOs = [
  {
    id: 1,
    name: "Chintan Environmental Research and Action Group",
    image: "/images/chintan.webp",
    cause: "Waste Management & Recycler Rights",
    impact: "Supporting over 25,000 waste pickers in India, managing 30+ tons of waste daily",
    donationNeeded: "Support Needed",
    website: "https://www.chintan-india.org",
    email: "info@chintan-india.org",
  },
  {
    id: 2,
    name: "Centre for Science and Environment (CSE)",
    image: "https://www.cseindia.org/assets/images/cse-logo.jpg",
    cause: "Environmental Research & Waste Management",
    impact: "Leading research and implementation of sustainable waste management practices across India",
    donationNeeded: "Support Needed",
    website: "https://www.cseindia.org",
    email: "cse@cseindia.org",
  },
  {
    id: 3,
    name: "Swechha",
    image: "https://swechha.in/wp-content/uploads/2020/03/swechha-logo.png",
    cause: "Environmental Conservation & Youth Development",
    impact: "Engaging youth in environmental action, managing waste segregation programs in Delhi",
    donationNeeded: "Support Needed",
    website: "https://swechha.in",
    email: "contact@swechha.in",
  },
  {
    id: 4,
    name: "Waste Warriors",
    image: "https://wastewarriors.org/wp-content/themes/waste/images/logo.png",
    cause: "Solid Waste Management",
    impact: "Managing waste in Dehradun, Dharamshala, and around Jim Corbett National Park",
    donationNeeded: "Support Needed",
    website: "https://wastewarriors.org",
    email: "info@wastewarriors.org",
  },
  {
    id: 5,
    name: "Daily Dump",
    image: "https://dailydump.org/wp-content/uploads/2019/03/daily-dump-logo.png",
    cause: "Home Composting Solutions",
    impact: "Helped over 60,000 households manage organic waste through composting",
    donationNeeded: "Support Needed",
    website: "https://dailydump.org",
    email: "contact@dailydump.org",
  },
  {
    id: 6,
    name: "Saahas Zero Waste",
    image: "https://saahaszerowaste.com/wp-content/uploads/2019/03/szw-logo.png",
    cause: "Zero Waste Management Solutions",
    impact: "Managing 80+ tons of waste daily across multiple Indian cities",
    donationNeeded: "Support Needed",
    website: "https://saahaszerowaste.com",
    email: "info@saahaszerowaste.com",
  }
];

const LocationCard = ({ location }) => (
  <Card
    sx={{
      display: "flex",
      mb: 3,
      background: "#FFFFFF",
      border: "1px solid rgba(46, 125, 50, 0.12)",
      borderRadius: 4,
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
      },
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 200 }}
      image={location.image}
      alt={location.name}
    />
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {location.name}
          </Typography>
          <Chip
            icon={<LocationOnIcon />}
            label={location.distance}
            sx={{
              background: "rgba(46, 125, 50, 0.08)",
              border: "1px solid rgba(46, 125, 50, 0.2)",
              color: "#2E7D32",
            }}
          />
        </Box>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body2" color="#566573">
            <LocationOnIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.address}
          </Typography>
          <Typography variant="body2" color="#566573">
            <PhoneIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.phone}
          </Typography>
          <Typography variant="body2" color="#566573">
            <EmailIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.email}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DirectionsIcon />}
            sx={{
              borderColor: "#2E7D32",
              color: "#2E7D32",
              "&:hover": {
                borderColor: "#1B5E20",
                backgroundColor: "rgba(46, 125, 50, 0.08)",
              },
            }}
          >
            Get Directions
          </Button>
          <Button
            variant="contained"
            startIcon={<LocalShippingIcon />}
            sx={{
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              color: "#000",
              "&:hover": {
                boxShadow: "0 0 15px rgba(0, 255, 149, 0.5)",
              },
            }}
          >
            Schedule Pickup
          </Button>
        </Box>
      </CardContent>
    </Box>
  </Card>
);

const NGOCard = ({ ngo }) => (
  <Card
    sx={{
      display: "flex",
      mb: 3,
      background: "#FFFFFF",
      border: "1px solid rgba(46, 125, 50, 0.12)",
      borderRadius: 4,
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
      },
    }}
  >
    <CardMedia
      component="img"
      sx={{ width: 200 }}
      image={ngo.image}
      alt={ngo.name}
    />
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {ngo.name}
          </Typography>
          <Chip
            icon={<VolunteerActivismIcon />}
            label={ngo.donationNeeded}
            sx={{
              background: "rgba(46, 125, 50, 0.08)",
              border: "1px solid rgba(46, 125, 50, 0.2)",
              color: "#2E7D32",
            }}
          />
        </Box>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body1" color="#566573" fontWeight="bold">
            {ngo.cause}
          </Typography>
          <Typography variant="body2" color="#566573">
            Impact: {ngo.impact}
          </Typography>
          <Typography variant="body2" color="#566573">
            <EmailIcon sx={{ mr: 1, fontSize: "small" }} />
            {ngo.email}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => window.open(ngo.website, '_blank')}
            sx={{
              borderColor: "#2E7D32",
              color: "#2E7D32",
              "&:hover": {
                borderColor: "#1B5E20",
                backgroundColor: "rgba(46, 125, 50, 0.08)",
              },
            }}
          >
            Visit Website
          </Button>
          <Button
            variant="contained"
            startIcon={<VolunteerActivismIcon />}
            onClick={() => window.open(`mailto:${ngo.email}?subject=Donation%20Inquiry`, '_blank')}
            sx={{
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              color: "#000",
              "&:hover": {
                boxShadow: "0 0 15px rgba(0, 255, 149, 0.5)",
              },
            }}
          >
            Donate Here
          </Button>
        </Box>
      </CardContent>
    </Box>
  </Card>
);

const Service = () => {
  const location = useLocation();
  const { title } = location.state || { title: "Recycling Service" };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isCommunityImpact = title === "Community Impact";

  useEffect(() => {
    const fetchNGOData = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(realNGOs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NGO data:", error);
        setError("Failed to load NGO data. Please try again later.");
        setLoading(false);
      }
    };

    if (isCommunityImpact) {
      fetchNGOData();
    }
  }, [isCommunityImpact]);

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "90vh",
        py: 8,
        px: 4,
        background: "#FFFFFF",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
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
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            color: "#566573",
            textAlign: "center",
          }}
        >
          {isCommunityImpact ? "Environmental NGOs Making an Impact" : "Recycling Locations Near You"}
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {isCommunityImpact
              ? data.map((ngo) => <NGOCard key={ngo.id} ngo={ngo} />)
              : mockLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Service;
