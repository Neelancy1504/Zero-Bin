import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import supabase from "../../helpers/supabase";
import LogoutIcon from "@mui/icons-material/Logout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user) navigate("/login");
    };
    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        minHeight: "90vh",
        py: 8,
        px: 4,
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1F8E9 100%)",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 4,
          background: "#FFFFFF",
          border: "1px solid rgba(46, 125, 50, 0.12)",
          borderRadius: 4,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Avatar
            sx={{
              width: 120,
              height: 120,
              bgcolor: "#2E7D32",
              fontSize: "3rem",
            }}
          >
            {user.email[0].toUpperCase()}
          </Avatar>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2E7D32",
            }}
          >
            Profile
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" color="#566573" mb={1}>
              Email
            </Typography>
            <Typography variant="h6" color="#1C2833" mb={3}>
              {user.email}
            </Typography>

            <Divider sx={{ my: 3, borderColor: "rgba(46, 125, 50, 0.12)" }} />

            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default Profile;
