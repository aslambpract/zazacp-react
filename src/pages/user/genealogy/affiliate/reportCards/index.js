import React from "react";
// @mui
import { Box, Typography, Divider } from "@mui/material";
const Index = ({ title, count }) => {
  return (
    <div>
      <Box
        sx={{
          justifyContent: "center",
          textAlign: "center",
          border: "dashed 1px #dadada",
          padding: "0.5rem",
          borderRadius: "2rem",
          margin: "5px",
        }}
      >
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h5" sx={{ marginTop: 1 }}>
          {count}
        </Typography>
      </Box>
    </div>
  );
};

export default Index;
