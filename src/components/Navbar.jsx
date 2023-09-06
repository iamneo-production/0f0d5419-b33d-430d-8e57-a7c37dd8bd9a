import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { palette } = useTheme();
  const primaryMain = palette.primary.main;
  const primaryDark = palette.primary.dark;

  const navigate = useNavigate();

  return (
    // Akilani
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex" },

              flexGrow: 1,
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: ".1rem",
              color: primaryDark,
              textDecoration: "none",
            }}
          >
            Text Editor
          </Typography>

          <Box sx={{ flexGrow: 0, display: "flex", gap: "1.5rem", mr: "1rem" }}>
            <NavLink
              to={"/home"}
              style={({ isActive }) => {
                return {
                  color: isActive ? primaryDark : primaryMain,
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "block",
                };
              }}
            >
              Home
            </NavLink>
            <NavLink
              to={"/view-all-documents"}
              style={({ isActive }) => {
                return {
                  color: isActive ? primaryDark : primaryMain,
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "block",
                };
              }}
            >
              Documents
            </NavLink>
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <Tooltip title="Logout">
              <IconButton
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/");
                }}
              >
                <LogoutOutlined sx={{ color: "#706fec" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
