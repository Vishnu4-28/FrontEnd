import React from "react";
import { AppBar, Toolbar, Typography, Box, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="fixed" color="info" sx={{ top: "auto", bottom: 0, padding: 0 }}>
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </Typography>
          <Box>
            <Link color="inherit" sx={{ marginRight: 2 }}>
              Privacy Policy
            </Link>
            <Link color="inherit">
              Terms of Service
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
