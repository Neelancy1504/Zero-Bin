import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loading = ({ size = "large", color }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress
        size={size === "large" ? 48 : 24}
        color="primary"
        style={{ color: color }}
      />
    </Box>
  );
};

export default Loading;
