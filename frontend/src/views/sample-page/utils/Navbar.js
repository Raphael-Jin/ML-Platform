import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import logo from "./logo192.png";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" bg-color="black">
        <Toolbar>
          <img src={logo} alt="Logo" className="logo" />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            MLHelper
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
