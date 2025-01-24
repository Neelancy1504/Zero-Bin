import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const services = [
  {
    icon: <RecyclingIcon sx={{ fontSize: 40 }} />,
    title: "Waste Management",
    description: "Smart recycling solutions for businesses and individuals",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: "Pickup Service",
    description: "Scheduled pickups at your convenience",
  },
  {
    icon: <InventoryIcon sx={{ fontSize: 40 }} />,
    title: "Inventory Tracking",
    description: "Real-time tracking of your recyclable inventory",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
    title: "Business Connect",
    description: "Connect with recycling businesses directly",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
    title: "Community Impact",
    description: "Make a positive impact on your local community",
  },
  {
    icon: <PriceCheckIcon sx={{ fontSize: 40 }} />,
    title: "Best Value",
    description: "Get the best value for your recyclable materials",
  },
];

const ServiceCard = ({ icon, title, description }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        textAlign: "center",
        background: "#FFFFFF",
        border: "1px solid rgba(46, 125, 50, 0.12)",
        borderRadius: 4,
        transition: "all 0.3s ease-in-out",
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
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#566573",
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Debug log
    console.log("Location state:", location.state);

    if (location.state?.fromHeader === "services") {
      // Delay showing the popup slightly to ensure rendering is complete
      setTimeout(() => {
        setOpenSnackbar(true);
        const element = document.getElementById("get-started");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location.state]);

  const handleGetStartedClick = () => {
    const element = document.getElementById("get-started");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      id="services"
      sx={{
        paddingTop: 5,
        px: 2,
        position: "relative",
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
        Our Services
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>

      {/* <Box
        id="get-started"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 6,
          position: "relative",
        }}
      >
        {/* Popup positioned relative to the button */}
      {/* <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          sx={{
            position: "absolute",
            bottom: "100%", // Position above the button
            left: "50%",
            transform: "translateX(-50%)",
            // marginBottom: '20px',
          }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            icon={<ArrowDownwardIcon />}
            sx={{
              backgroundColor: "#2E7D32",
              color: "white",
              minWidth: "200px",
              display: "flex",
              alignItems: "center",
              "& .MuiAlert-icon": {
                color: "white",
                fontSize: "24px",
                animation: "bounce 1s infinite",
              },
              "& .MuiAlert-action": {
                color: "white",
              },
              cursor: "pointer",
              "@keyframes bounce": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },
                "50%": {
                  transform: "translateY(10px)",
                },
              },
            }}
            onClick={handleGetStartedClick}
          >
            Click here to get started!
          </Alert>
        </Snackbar>
      </Box> */}
    </Box>
  );
};

export default Services;

// import { useState } from "react";
// import {
//   Box,
//   TextField,
//   Grid,
//   Card,
//   Typography,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
// import DescriptionIcon from "@mui/icons-material/Description";
// import DevicesIcon from "@mui/icons-material/Devices";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import CheckroomIcon from "@mui/icons-material/Checkroom";
// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import ChairIcon from "@mui/icons-material/Chair";
// import BuildIcon from "@mui/icons-material/Build";
// import { useNavigate } from "react-router-dom";

// const recycleServices = [
//   {
//     icon: <BatteryChargingFullIcon sx={{ fontSize: 40 }} />,
//     title: "Batteries",
//     description: "Recycle all types of batteries",
//     image:
//       "https://i.pinimg.com/736x/e5/96/e5/e596e55f36ec0266d166bf41d5549a11.jpg",
//   },
//   {
//     icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
//     title: "Paper",
//     description: "Paper, cardboard, and documents",
//     image:
//       "https://i.pinimg.com/736x/e3/d5/34/e3d534d198a6a27195efe718bcd48712.jpg",
//   },
//   {
//     icon: <DevicesIcon sx={{ fontSize: 40 }} />,
//     title: "Electronics",
//     description: "E-waste and electronic devices",
//     image:
//       "https://clipart-library.com/8300/1931/electronic-device-cartoon-illustration-set_103027-447.jpg",
//   },
//   {
//     icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
//     title: "Food ",
//     description: "Organic",
//     image:
//       "https://i.pinimg.com/736x/69/75/63/6975634aa0fb5c4a381d989083db4b06.jpg",
//   },
//   {
//     icon: <CheckroomIcon sx={{ fontSize: 40 }} />,
//     title: "Clothing",
//     description: "Textiles and clothing items",
//     image:
//       "https://i.pinimg.com/736x/0f/f3/89/0ff389295051ab7f88c03084275c6f13.jpg",
//   },
//   {
//     icon: <AutorenewIcon sx={{ fontSize: 40 }} />,
//     title: "Plastics",
//     description: "All types of plastic materials",
//     image:
//       "https://img.freepik.com/premium-vector/waste-that-takes-long-decompose-plastic-bag-disposable-cup-plastic-bottle_799239-30.jpg?w=740",
//   },
//   {
//     icon: <ChairIcon sx={{ fontSize: 40 }} />,
//     title: "Furniture",
//     description: "Used and old furniture",
//     image:
//       "https://as2.ftcdn.net/jpg/02/20/23/85/1000_F_220238561_xt6t6gv6wHV5Nl435yUVTYr6rM0knTWa.jpg",
//   },
//   {
//     icon: <BuildIcon sx={{ fontSize: 40 }} />,
//     title: "Metal",
//     description: "Scrap metal and metallic items",
//     image:
//       "https://i.pinimg.com/736x/5d/ad/0d/5dad0dfa9dee0604a2c8fa00df58631f.jpg",
//   },
// ];

// const ServiceCard = ({ icon, title, description, image }) => {
//   const navigate = useNavigate();

//   return (
//     <Card
//       onClick={() => navigate("/service", { state: { title } })}
//       sx={{
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: 3,
//         textAlign: "center",
//         background: "#FFFFFF",
//         border: "1px solid rgba(46, 125, 50, 0.12)",
//         borderRadius: 4,
//         transition: "all 0.3s ease-in-out",
//         cursor: "pointer",
//         "&:hover": {
//           transform: "translateY(-8px)",
//           boxShadow: "0 4px 20px rgba(46, 125, 50, 0.15)",
//           "& .icon": {
//             color: "#2E7D32",
//           },
//         },
//       }}
//     >
//       <Box
//         component="img"
//         src={image}
//         alt={title}
//         sx={{
//           width: "100%",
//           height: 140,
//           objectFit: "cover",
//           borderRadius: 2,
//           mb: 2,
//         }}
//       />
//       <Box
//         className="icon"
//         sx={{
//           color: "#4CAF50",
//           mb: 2,
//           transition: "all 0.3s ease-in-out",
//         }}
//       >
//         {icon}
//       </Box>
//       <Typography
//         variant="h6"
//         sx={{
//           mb: 1,
//           fontWeight: "bold",
//           color: "#2E7D32",
//         }}
//       >
//         {title}
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{
//           color: "#566573",
//         }}
//       >
//         {description}
//       </Typography>
//     </Card>
//   );
// };

// const Selection = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredServices = recycleServices.filter((service) =>
//     service.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box
//       sx={{
//         minHeight: "90vh",
//         py: 8,
//         px: 4,
//         background: "#FFFFFF",
//       }}
//     >
//       <Typography
//         variant="h2"
//         sx={{
//           textAlign: "center",
//           mb: 6,
//           fontWeight: "bold",
//           background: "#2E7D32",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         What are we Recycling Today?
//       </Typography>

//       <Box sx={{ maxWidth: 600, mx: "auto", mb: 6, backgroundColor: "white" }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Search services..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: "black" }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "black",
//               },
//               "&:hover fieldset": {
//                 borderColor: "black",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: "black",
//               },
//             },
//           }}
//         />
//       </Box>

//       <Grid container spacing={4}>
//         {filteredServices.map((service, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <ServiceCard {...service} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Selection;
