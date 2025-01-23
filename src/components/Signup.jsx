import { useState } from "react";
import { Box, Button, Card, TextField, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../helpers/supabase";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //     });
  //     if (error) throw error;
  //     setMessage("Check your email for the confirmation link!");
  //   } catch (error) {
  //     setMessage(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Sign up the user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) throw signUpError;

      // Insert into the users table
      const userId = signUpData.user?.id; // Get the user ID from the signed-up user
      if (userId) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            userid: userId, // Insert the user ID
            name: name, // Replace this with actual full name input
            email: email, // Use the email entered during signup
          },
        ]);

        if (insertError) throw insertError;
      }

      setMessage("Check your email for the confirmation link!");
    } catch (error) {
      console.error("Sign-up error:", error);
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
            onChange={(e) => setname(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2E7D32",
                },
                "&:hover fieldset": {
                  borderColor: "#2E7D32",
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
                  borderColor: "#2E7D32",
                },
                "&:hover fieldset": {
                  borderColor: "#2E7D32",
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
                  borderColor: "#2E7D32",
                },
                "&:hover fieldset": {
                  borderColor: "#2E7D32",
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
            color: "grey",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#2E7D32",
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
