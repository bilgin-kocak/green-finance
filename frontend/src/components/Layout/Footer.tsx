import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Footer: React.FC = () => {
  return (
    <Box component="footer" py={3}>
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} EcoTokenize. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
