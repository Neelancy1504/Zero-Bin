// import { useState, useEffect } from "react";
// import {
//   AppBar,
//   Box,
//   Button,
//   Toolbar,
//   Typography,
//   Avatar,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import PersonIcon from "@mui/icons-material/Person";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import RecyclingIcon from "@mui/icons-material/Recycling";
// import supabase from "../../helpers/supabase";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import LeaderboardIcon from "@mui/icons-material/Leaderboard";
// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMobileMenuToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleMenuItemClick = (path) => {
//     navigate(path);
//     handleClose();
//     setMobileOpen(false);
//   };

//   const scrollToSection = (sectionId) => {
//     if (location.pathname !== "/") {
//       navigate("/", { state: { fromHeader: sectionId } });
//     } else {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//         if (sectionId === "services") {
//           navigate(".", { state: { fromHeader: "services" }, replace: true });
//         }
//       }
//     }
//     setMobileOpen(false);
//   };

//   useEffect(() => {
//     supabase.auth.getUser().then(({ data: { user } }) => {
//       setUser(user);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const MobileMenuDrawer = () => (
//     <Drawer
//       anchor="right"
//       open={mobileOpen}
//       onClose={handleMobileMenuToggle}
//       ModalProps={{
//         keepMounted: true, // Better open performance on mobile.
//       }}
//       sx={{
//         "& .MuiDrawer-paper": {
//           width: 250,
//           boxSizing: "border-box",
//           backgroundColor: "#f4f4f4",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           p: 2,
//           borderBottom: "1px solid #e0e0e0",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <RecyclingIcon sx={{ color: "#32a137", fontSize: 30 }} />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 600,
//               color: "#32a137",
//             }}
//           >
//             ZeroBin
//           </Typography>
//         </Box>
//         <IconButton onClick={handleMobileMenuToggle}>
//           <CloseIcon />
//         </IconButton>
//       </Box>
//       <List>
//         {[
//           { text: "Home", path: "/" },
//           { text: "Our Services", path: "/services" },
//           { text: "About Us", path: "/about" },
//           { text: "Insights", path: "/insights" },
//           { text: "FAQs", path: "/faqs" },
//         ].map((item) => (
//           <ListItem
//             key={item.text}
//             button
//             onClick={() => handleMenuItemClick(item.path)}
//           >
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}

//         {user && (
//           <>
//             <ListItem button onClick={() => handleMenuItemClick("/pickuplist")}>
//               <ListItemIcon>
//                 <LocalShippingIcon sx={{ color: "#2E7D32" }} />
//               </ListItemIcon>
//               <ListItemText primary="Track My Pickup" />
//             </ListItem>
//             <ListItem button onClick={() => handleMenuItemClick("/profile")}>
//               <ListItemIcon>
//                 <PersonIcon sx={{ color: "#2E7D32" }} />
//               </ListItemIcon>
//               <ListItemText primary="My Profile" />
//             </ListItem>
//             <ListItem button onClick={() => handleMenuItemClick("/ecopoints")}>
//               <ListItemIcon>
//                 <EmojiEventsIcon sx={{ color: "#2E7D32" }} />
//               </ListItemIcon>
//               <ListItemText primary="My EcoPoints" />
//             </ListItem>
//             <ListItem
//               button
//               onClick={() => handleMenuItemClick("/leaderboard")}
//             >
//               <ListItemIcon>
//                 <LeaderboardIcon sx={{ color: "#2E7D32" }} />{" "}
//                 {/* Leaderboard Icon */}
//               </ListItemIcon>
//               <ListItemText primary="Leaderboard" /> {/* Leaderboard Option */}
//             </ListItem>
//           </>
//         )}

//         {!user && (
//           <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
//             <Button
//               fullWidth
//               variant="outlined"
//               onClick={() => handleMenuItemClick("/signup")}
//             >
//               Sign Up
//             </Button>
//             <Button
//               fullWidth
//               variant="contained"
//               onClick={() => handleMenuItemClick("/login")}
//             >
//               Login
//             </Button>
//           </Box>
//         )}
//       </List>
//     </Drawer>
//   );

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         sx={{
//           backgroundColor: "rgba(255, 255, 255, 0.6)",
//           backdropFilter: "blur(10px)",
//           boxShadow: "none",
//           borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             py: 1,
//           }}
//         >
//           {/* Logo and Brand */}
//           <Box
//             sx={{ display: "flex", alignItems: "center", gap: 0, width: "1%" }}
//           >
//             <RecyclingIcon sx={{ color: "#32a137", fontSize: 40, mr: 0 }} />
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 600,
//                 color: "#32a137",
//                 cursor: "pointer",
//               }}
//               onClick={() => navigate("/")}
//             >
//               ZeroBin
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               marginLeft: "7%",
//               gap: 10,
//               fontSize: "15px",
//             }}
//           >
//             <Button
//               color="inherit"
//               sx={{ color: "#333", fontSize: "15px" }}
//               onClick={() => navigate("/")}
//             >
//               Home
//             </Button>
//             <Button
//               color="inherit"
//               sx={{ color: "#333" }}
//               onClick={() => navigate("/services")}
//             >
//               Our Services
//             </Button>
//             <Button
//               color="inherit"
//               sx={{ color: "#333" }}
//               onClick={() => navigate("/about")}
//             >
//               About Us
//             </Button>
//             <Button
//               color="inherit"
//               sx={{ color: "#333" }}
//               onClick={() => navigate("/insights")}
//             >
//               Insights
//             </Button>
//             <Button
//               color="inherit"
//               sx={{ color: "#333" }}
//               onClick={() => navigate("/faqs")}
//             >
//               FAQs
//             </Button>
//             {user && (
//               <Button
//                 color="inherit"
//                 sx={{
//                   color: "#333",
//                   display: "flex",
//                   alignItems: "center",
//                   border: "1px solid black",
//                   gap: 1,
//                 }}
//                 onClick={() => navigate("/ecopoints")}
//               >
//                 <MonetizationOnIcon sx={{ color: "#FFD700" }} />
//                 Your Ecopoints
//               </Button>
//             )}
//           </Box>

//           {/* Mobile Menu Toggle */}
//           <Box sx={{ display: { xs: "block", md: "none" } }}>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleMobileMenuToggle}
//             >
//               <MenuIcon />
//             </IconButton>
//           </Box>

//           {/* Desktop User Section */}
//           <Box sx={{ display: { xs: "none", md: "block" } }}>
//             {user ? (
//               <>
//                 <Avatar
//                   sx={{
//                     cursor: "pointer",
//                     bgcolor: "#2E7D32",
//                     "&:hover": {
//                       boxShadow: "0 2px 8px rgba(46, 125, 50, 0.25)",
//                     },
//                   }}
//                   onClick={handleClick}
//                 >
//                   {user.email[0].toUpperCase()}
//                 </Avatar>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={open}
//                   onClose={handleClose}
//                   onClick={handleClose}
//                   PaperProps={{
//                     elevation: 0,
//                     sx: {
//                       overflow: "visible",
//                       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
//                       mt: 1.5,
//                       "& .MuiMenuItem-root": {
//                         px: 2.5,
//                         py: 1.5,
//                       },
//                     },
//                   }}
//                   transformOrigin={{ horizontal: "right", vertical: "top" }}
//                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                 >
//                   <MenuItem onClick={() => handleMenuItemClick("/pickuplist")}>
//                     <ListItemIcon>
//                       <LocalShippingIcon
//                         fontSize="small"
//                         sx={{ color: "#2E7D32" }}
//                       />
//                     </ListItemIcon>
//                     Track My Pickup
//                   </MenuItem>
//                   <MenuItem onClick={() => handleMenuItemClick("/profile")}>
//                     <ListItemIcon>
//                       <PersonIcon fontSize="small" sx={{ color: "#2E7D32" }} />
//                     </ListItemIcon>
//                     My Profile
//                   </MenuItem>
//                   <MenuItem onClick={() => handleMenuItemClick("/ecopoints")}>
//                     <ListItemIcon>
//                       <EmojiEventsIcon
//                         fontSize="small"
//                         sx={{ color: "#2E7D32" }}
//                       />
//                     </ListItemIcon>
//                     My EcoPoints
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Box
//                 style={{
//                   gap: 3,
//                 }}
//               >
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     transition: "all 0.3s ease-in-out",
//                     mr: 2,
//                   }}
//                   onClick={() => navigate("/signup")}
//                 >
//                   Sign Up
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     transition: "all 0.3s ease-in-out",
//                   }}
//                   onClick={() => navigate("/login")}
//                 >
//                   Login
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Menu Drawer */}
//       <MobileMenuDrawer />
//     </>
//   );
// };

// export default Header;
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RecyclingIcon from "@mui/icons-material/Recycling";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // Import Leaderboard icon
import supabase from "../../helpers/supabase";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
    setMobileOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { fromHeader: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        if (sectionId === "services") {
          navigate(".", { state: { fromHeader: "services" }, replace: true });
        }
      }
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const MobileMenuDrawer = () => (
    <Drawer
      anchor="right"
      open={mobileOpen}
      onClose={handleMobileMenuToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#f4f4f4",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <RecyclingIcon sx={{ color: "#32a137", fontSize: 30 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#32a137",
            }}
          >
            ZeroBin
          </Typography>
        </Box>
        <IconButton onClick={handleMobileMenuToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {[
          { text: "Home", path: "/" },
          { text: "Our Services", path: "/services" },
          { text: "About Us", path: "/about" },
          { text: "Insights", path: "/insights" },
          { text: "FAQs", path: "/faqs" },
        ].map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => handleMenuItemClick(item.path)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        {user && (
          <>
            <ListItem button onClick={() => handleMenuItemClick("/pickuplist")}>
              <ListItemIcon>
                <LocalShippingIcon sx={{ color: "#2E7D32" }} />
              </ListItemIcon>
              <ListItemText primary="Track My Pickup" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick("/profile")}>
              <ListItemIcon>
                <PersonIcon sx={{ color: "#2E7D32" }} />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={() => handleMenuItemClick("/ecopoints")}>
              <ListItemIcon>
                <EmojiEventsIcon sx={{ color: "#2E7D32" }} />
              </ListItemIcon>
              <ListItemText primary="My EcoPoints" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleMenuItemClick("/leaderboard")}
            >
              <ListItemIcon>
                <LeaderboardIcon sx={{ color: "#2E7D32" }} />{" "}
                {/* Leaderboard Icon */}
              </ListItemIcon>
              <ListItemText primary="Leaderboard" /> {/* Leaderboard Option */}
            </ListItem>
          </>
        )}

        {!user && (
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleMenuItemClick("/signup")}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleMenuItemClick("/login")}
            >
              Login
            </Button>
          </Box>
        )}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
          }}
        >
          {/* Logo and Brand */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0, width: "1%" }}
          >
            <RecyclingIcon sx={{ color: "#32a137", fontSize: 40, mr: 0 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "#32a137",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              ZeroBin
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginLeft: "7%",
              gap: 10,
              fontSize: "15px",
            }}
          >
            <Button
              color="inherit"
              sx={{ color: "#333", fontSize: "17px" }}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={{ color: "#333", fontSize: "17px" }}
              onClick={() => navigate("/services")}
            >
              Our Services
            </Button>
            <Button
              color="inherit"
              sx={{ color: "#333", fontSize: "17px" }}
              onClick={() => navigate("/about")}
            >
              About Us
            </Button>
            <Button
              color="inherit"
              sx={{ color: "#333", fontSize: "17px" }}
              onClick={() => navigate("/insights")}
            >
              Insights
            </Button>
            <Button
              color="inherit"
              sx={{ color: "#333", fontSize: "17px" }}
              onClick={() => navigate("/faqs")}
            >
              FAQs
            </Button>
            {user && (
              <Button
                color="inherit"
                sx={{
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid black",
                  gap: 1,
                }}
                onClick={() => navigate("/ecopoints")}
              >
                <MonetizationOnIcon sx={{ color: "#FFD700" }} />
                Your Ecopoints
              </Button>
            )}
          </Box>

          {/* Mobile Menu Toggle */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleMobileMenuToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop User Section */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {user ? (
              <>
                <Avatar
                  sx={{
                    cursor: "pointer",
                    bgcolor: "#2E7D32",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(46, 125, 50, 0.25)",
                    },
                  }}
                  onClick={handleClick}
                >
                  {user.email[0].toUpperCase()}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
                      mt: 1.5,
                      "& .MuiMenuItem-root": {
                        px: 2.5,
                        py: 1.5,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => handleMenuItemClick("/pickuplist")}>
                    <ListItemIcon>
                      <LocalShippingIcon
                        fontSize="small"
                        sx={{ color: "#2E7D32" }}
                      />
                    </ListItemIcon>
                    Track My Pickup
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("/profile")}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" sx={{ color: "#2E7D32" }} />
                    </ListItemIcon>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("/ecopoints")}>
                    <ListItemIcon>
                      <EmojiEventsIcon
                        fontSize="small"
                        sx={{ color: "#2E7D32" }}
                      />
                    </ListItemIcon>
                    My EcoPoints
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("/leaderboard")}>
                    <ListItemIcon>
                      <LeaderboardIcon sx={{ color: "#2E7D32" }} />{" "}
                      {/* Leaderboard Icon */}
                    </ListItemIcon>
                    Leaderboard {/* Leaderboard Option */}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box
                style={{
                  gap: 3,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    transition: "all 0.3s ease-in-out",
                    mr: 2,
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    transition: "all 0.3s ease-in-out",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer />
    </>
  );
};

export default Header;
