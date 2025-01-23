import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SearchIcon from "@mui/icons-material/Search";

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
    image:
      "https://www.chintan-india.org/sites/default/files/2019-10/Chintan_old_1.png",
    cause: "Waste Management & Recycler Rights",
    impact:
      "Supporting over 25,000 waste pickers in India, managing 30+ tons of waste daily",
    donationNeeded: "Support Needed",
    website: "https://www.chintan-india.org",
    email: "info@chintan-india.org",
  },
  {
    id: 2,
    name: "Centre for Science and Environment (CSE)",
    image:
      "https://pbs.twimg.com/profile_images/1035005681311653891/yNJVGno8_400x400.jpg",
    cause: "Environmental Research & Waste Management",
    impact:
      "Leading research and implementation of sustainable waste management practices across India",
    donationNeeded: "Support Needed",
    website: "https://www.cseindia.org",
    email: "cse@cseindia.org",
  },
  {
    id: 3,
    name: "Swechha",
    image:
      "https://swechha.in/wp-content/uploads/2020/01/swechha-site-logo-1-scaled.jpg",
    cause: "Environmental Conservation & Youth Development",
    impact:
      "Engaging youth in environmental action, managing waste segregation programs in Delhi",
    donationNeeded: "Support Needed",
    website: "https://swechha.in",
    email: "contact@swechha.in",
  },
  {
    id: 4,
    name: "Waste Warriors",
    image: "https://wastewarriors.org/wp-content/themes/waste/images/logo.png",
    cause: "Solid Waste Management",
    impact:
      "Managing waste in Dehradun, Dharamshala, and around Jim Corbett National Park",
    donationNeeded: "Support Needed",
    website: "https://wastewarriors.org",
    email: "info@wastewarriors.org",
  },
  {
    id: 5,
    name: "Daily Dump",
    image:
      "https://dailydump.org/wp-content/uploads/2019/03/daily-dump-logo.png",
    cause: "Home Composting Solutions",
    impact:
      "Helped over 60,000 households manage organic waste through composting",
    donationNeeded: "Support Needed",
    website: "https://dailydump.org",
    email: "contact@dailydump.org",
  },
  {
    id: 6,
    name: "Saahas Zero Waste",
    image:
      "https://saahaszerowaste.com/wp-content/uploads/2019/03/szw-logo.png",
    cause: "Zero Waste Management Solutions",
    impact: "Managing 80+ tons of waste daily across multiple Indian cities",
    donationNeeded: "Support Needed",
    website: "https://saahaszerowaste.com",
    email: "info@saahaszerowaste.com",
  },
];

const GOOGLE_MAPS_API_KEY = "AlzaSyhH1ZfFRZTEQmHZ0OYefkmdpkVGXW5Zxys"; // Replace with your actual API key

// Add these utility functions for API calls
const findPlaceFromText = async (searchText) => {
  try {
    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/place/findplacefromtext/json?` +
        `input=${encodeURIComponent(searchText)}&` +
        `inputtype=textquery&` +
        `fields=formatted_address,geometry,name,place_id&` +
        `key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to find place");
    }

    const data = await response.json();
    return data.candidates[0]; // Return the first match
  } catch (error) {
    console.error("Error finding place:", error);
    throw error;
  }
};

const searchNearbyPlaces = async (latitude, longitude, searchQuery) => {
  try {
    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?` +
        `location=${latitude},${longitude}&` +
        `radius=20000&` + // 20km in meters
        `keyword=${encodeURIComponent(searchQuery)}&` +
        `key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch nearby places");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
};

const getPlaceDetails = async (placeId) => {
  try {
    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/place/details/json?` +
        `place_id=${placeId}&` +
        `fields=name,formatted_address,formatted_phone_number,website,photos,geometry&` +
        `key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch place details");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

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
        </Box>

        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="body2" color="#566573">
            <LocationOnIcon sx={{ mr: 1, fontSize: "small" }} />
            {location.formatted_address}
          </Typography>
          {location.formatted_phone_number && (
            <Typography variant="body2" color="#566573">
              <PhoneIcon sx={{ mr: 1, fontSize: "small" }} />
              {location.formatted_phone_number}
            </Typography>
          )}
          {location.website && (
            <Typography variant="body2" color="#566573">
              <EmailIcon sx={{ mr: 1, fontSize: "small" }} />
              {location.website}
            </Typography>
          )}
        </Stack>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DirectionsIcon />}
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  location.formatted_address
                )}`
              )
            }
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
          {location.formatted_phone_number && (
            <Button
              variant="contained"
              startIcon={<PhoneIcon />}
              onClick={() =>
                window.open(`tel:${location.formatted_phone_number}`)
              }
              sx={{
                background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
                color: "#000",
                "&:hover": {
                  boxShadow: "0 0 15px rgba(0, 255, 149, 0.5)",
                },
              }}
            >
              Call Now
            </Button>
          )}
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
              background: "#000000",
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
            onClick={() => window.open(ngo.website, "_blank")}
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
            onClick={() =>
              window.open(
                `mailto:${ngo.email}?subject=Donation%20Inquiry`,
                "_blank"
              )
            }
            sx={{
              bgcolor: "#2E7D32",
              px: 4,
              py: 1.5,
              borderRadius: "20px",
              "&:hover": {
                bgcolor: "#1B5E20",
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

const LocationSearchDialog = ({ onLocationSelect, onClose }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText.trim()) {
      try {
        const place = await findPlaceFromText(searchText);
        if (place) {
          onLocationSelect(place);
        }
      } catch (error) {
        console.error("Error in search:", error);
      }
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        sx: {
          zIndex: 1300,
          position: "relative",
          minWidth: "300px",
        },
      }}
    >
      <DialogTitle>Find Recycling Centers Near You</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your location to find recycling centers within 20km.
        </DialogContentText>
        <TextField
          fullWidth
          margin="dense"
          variant="outlined"
          placeholder="Enter your location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSearch} color="primary" variant="contained">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = document.createElement("style");
styles.textContent = `
  .pac-container {
    z-index: 1400 !important;
  }
`;
document.head.appendChild(styles);

const Service = () => {
  const location = useLocation();
  const { title } = location.state || { title: "Recycling Service" };
  const [searchLocation, setSearchLocation] = useState("");
  const [recyclingCenters, setRecyclingCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationDialog, setShowLocationDialog] = useState(true);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const isCommunityImpact = title === "Community Impact";
  const navigate = useNavigate();
  const handleLocationSelect = async (place) => {
    try {
      setLoading(true);

      const { geometry, place_id } = place;
      const { lat, lng } = geometry.location;

      // Search for nearby recycling centers
      const results = await searchNearbyPlaces(
        lat,
        lng,
        `${title.toLowerCase()} recycling center`
      );

      if (!results || results.length === 0) {
        setError("No recycling centers found in this area");
        setLoading(false);
        return;
      }

      // Check if results already contain sufficient details
      const validResults = results.slice(0, 5);

      // If additional details are needed
      const detailedResults = await Promise.all(
        validResults.map((result) =>
          result.detailsAvailable ? result : getPlaceDetails(result.place_id)
        )
      );

      setRecyclingCenters(detailedResults.filter((result) => result !== null));
      setShowLocationDialog(false);
      setLoading(false);
    } catch (error) {
      console.error("Error in handleLocationSelect:", error);
      setError("Failed to find recycling centers. Please try again.");
      setLoading(false);
    }
  };

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
            mb: 3,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </Typography>

        {/* Arrange Pickup Button (hidden for Community Impact page) */}
        {title !== "Community Impact" && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => navigate("/pickupbooking")}
              // onClick={() => alert("Pickup arranged!")} // Replace this with your handler
              sx={{
                background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
                color: "#fff",
                px: 4,
                py: 1.5,
                borderRadius: "30px",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1B5E20 30%, #388E3C 90%)",
                },
              }}
            >
              Arrange Pickup
            </Button>
          </Box>
        )}

        {!isCommunityImpact && showLocationDialog && (
          <LocationSearchDialog
            onLocationSelect={handleLocationSelect}
            onClose={() => setShowLocationDialog(false)}
          />
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Box>
            {isCommunityImpact
              ? realNGOs.map((ngo) => <NGOCard key={ngo.id} ngo={ngo} />)
              : recyclingCenters.map((center, index) => (
                  <LocationCard key={index} location={center} />
                ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Service;
