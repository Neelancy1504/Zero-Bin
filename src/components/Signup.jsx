import { useState } from "react";
import { Box, Button, Card, TextField, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../zerobin/helpers/supabase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setMessage("Check your email for the confirmation link!");
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
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,20,20,1) 100%)",
      }}
    >
      <Card
        sx={{
          p: 4,
          maxWidth: "400px",
          width: "90%",
          background: "rgba(0, 0, 0, 0.6)",
          border: "1px solid rgba(0, 255, 149, 0.1)",
          borderRadius: 4,
          boxShadow: "0 0 20px rgba(0, 255, 149, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 10px rgba(0, 255, 149, 0.3)",
          }}
        >
          Create Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 255, 149, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 255, 149, 0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00ff95",
                },
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 255, 149, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 255, 149, 0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00ff95",
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
                  borderColor: "rgba(0, 255, 149, 0.2)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 255, 149, 0.4)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00ff95",
                },
              },
            }}
          />
          {message && (
            <Alert severity={message.includes("Check") ? "success" : "error"}>
              {message}
            </Alert>
          )}
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </Box>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#00ff95",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Signup;
