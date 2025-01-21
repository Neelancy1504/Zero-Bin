import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Selection from "./components/Selection";
import Service from "./components/Service";
import "./App.css";

// Create a Material Design 3 dark theme with neon accents
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff95", // Neon green
    },
    background: {
      default: "#000000", // Changed to pure black
      paper: "#000000", // Changed to pure black
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
          padding: "8px 24px",
        },
        contained: {
          background: "linear-gradient(45deg, #00ff95 30%, #00e5ff 90%)",
          boxShadow: "0 0 10px #00ff95, 0 0 20px #00ff95, 0 0 40px #00ff95",
          color: "#000",
          "&:hover": {
            boxShadow: "0 0 15px #00ff95, 0 0 25px #00ff95, 0 0 45px #00ff95",
          },
        },
        outlined: {
          borderColor: "#00ff95",
          color: "#00ff95",
          "&:hover": {
            borderColor: "#00ff95",
            boxShadow: "0 0 10px #00ff95, 0 0 20px #00ff95",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000",
          borderBottom: "1px solid rgba(0, 255, 149, 0.1)",
        },
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div
          style={{ width: "100%", minHeight: "100vh", margin: 0, padding: 0 }}
        >
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <main
                  style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "0 2rem",
                  }}
                >
                  <Hero />
                  <Services />
                </main>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Selection />} />
            <Route path="/service" element={<Service />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
