import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/your-logo.svg"; // Uncomment and add your logo

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 10px rgba(0, 255, 149, 0.5)",
            }}
          >
            ZeroBin
          </Typography>
        </Box>

        {/* Buttons Section */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              transition: "all 0.3s ease-in-out",
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
