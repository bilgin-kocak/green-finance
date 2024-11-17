import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, Container } from "@mui/material";

const Layout = ({ children }: any) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box component="main" flexGrow={1}>
        <Container>{children}</Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
