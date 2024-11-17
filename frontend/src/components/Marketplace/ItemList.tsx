import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import Link from "next/link";
import { getItems, getMetadata } from "../../services/marketplace";
import { formatEther } from "viem";

const ItemList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();

        let metadataPromises = [];
        for (let i = 0; i < response.data.length; i++) {
          const item = response.data[i];
          const idFromUri =
            item.tokenUri.split("/")[item.tokenUri.split("/").length - 1];
          console.log("idFromUri", idFromUri);
          const metadata = getMetadata(idFromUri);
          const priceInEther = formatEther(BigInt(item.price));
          console.log("priceInEther", priceInEther);
          response.data[i].price = priceInEther.toString();
          // response.data[i].priceInEther = priceInEther;
          metadataPromises.push(metadata);
        }

        const metadataResponses = await Promise.all(metadataPromises);
        for (let i = 0; i < metadataResponses.length; i++) {
          const metadataResponse = metadataResponses[i];
          response.data[i].metadata = metadataResponse.data;
        }
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch items", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Marketplace
        </Typography>
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.itemId} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.metadata.nftImageUrl}
                  alt={item.metadata.name}
                />
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item.metadata.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    TokenID: #{item.tokenId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Carbon Credits: {item.metadata.carbonCredits}
                  </Typography>
                  <Typography color="textSecondary">
                    Price: {item.price} ETH
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/marketplace/item/${item.itemId}`} passHref>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ItemList;
