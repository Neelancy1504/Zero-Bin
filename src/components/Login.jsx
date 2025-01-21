import { useState } from "react";
import { Box, Button, Card, TextField, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../helpers/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1F8E9 100%)",
      }}
    >
      <Card
        sx={{
          p: 4,
          maxWidth: "400px",
          width: "90%",
          background: "#FFFFFF",
          border: "1px solid rgba(46, 125, 50, 0.12)",
          borderRadius: 4,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            color: "#2E7D32",
          }}
        >
          Welcome Back
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2E7D32",
                },
                "&:hover fieldset": {
                  borderColor: "#2E7D32",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E7D32",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2E7D32",
                },
                "&:hover fieldset": {
                  borderColor: "#2E7D32",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E7D32",
                },
              },
            }}
          />
          {message && <Alert severity="error">{message}</Alert>}
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "grey",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#2E7D32",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
