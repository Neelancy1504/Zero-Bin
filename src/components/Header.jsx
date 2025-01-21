import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import supabase from "../../../zerobin/helpers/supabase";
// import logo from "../assets/your-logo.svg"; // Uncomment and add your logo

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
              background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ZeroBin
          </Typography>
        </Box>

        {/* Buttons Section */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {user ? (
            <Avatar
              sx={{
                cursor: "pointer",
                bgcolor: "#2E7D32",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(46, 125, 50, 0.25)",
                },
              }}
              onClick={() => navigate("/profile")}
            >
              {user.email[0].toUpperCase()}
            </Avatar>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
