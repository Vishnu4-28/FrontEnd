import React from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from "@mui/material";
import { ShoppingCart, AccountCircle, Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const SearchBar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f1f1f1",
  borderRadius: theme.shape.borderRadius,
  padding: "4px 8px",
  marginLeft: theme.spacing(2),
  flexGrow: 1,
}));

const Header = () => {
  const handleMenu = () =>{
    
    console.log("click")
  }
  return (
    <AppBar position="static" color="info">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ShopEase
        </Typography>
        
        {/* Search Bar */}
        {/* <SearchBar>
          <Search sx={{ marginRight: 1 }} />
          <InputBase placeholder="Search products…" fullWidth />
        </SearchBar> */}
        
        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
          <IconButton color="inherit">
            {/* <ShoppingCart /> */}
          </IconButton>
          <IconButton onClick={handleMenu}color="inherit">
            <AccountCircle  />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;