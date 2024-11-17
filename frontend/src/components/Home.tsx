import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to the Decentralized Carbon Trading Platform
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Offset your carbon footprint by trading verified carbon credits.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Buy Carbon Credits
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Purchase verified carbon credits to offset your emissions and
                  support environmental projects.
                </Typography>
                <Box my={2}>
                  <Link href="/marketplace" passHref>
                    <Button variant="contained" color="primary">
                      Go to Marketplace
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3">
                  Tokenize Carbon Credits
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Create and mint your own carbon credit token to sell on our
                  marketplace.
                </Typography>
                <Box my={2}>
                  <Link href="/nft/mint" passHref>
                    <Button variant="contained" color="primary">
                      Mint Carbon Credit Token
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
