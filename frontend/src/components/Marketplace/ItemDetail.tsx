import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Typography, Box, Button, CardMedia } from "@mui/material";
import { getItem, buyItem, getMetadata } from "../../services/marketplace";
import TotalPrice from "./TotalPrice";
import { buyNFT } from "@/services/nft";
import { formatEther } from "viem";

interface IItemProps {
  itemId: string | string[];
}

const ItemDetail = ({ itemId }: IItemProps) => {
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (itemId) {
      const fetchItem = async () => {
        try {
          const response = await getItem(itemId as string);
          // GEt metadata
          const idFromUri =
            response.data.tokenUri.split("/")[
              response.data.tokenUri.split("/").length - 1
            ];
          console.log("idFromUri", idFromUri);
          const metadataResponse = await getMetadata(idFromUri);
          // const metadataResponse = await getMetadata(response.data.tokenUri);
          response.data.metadata = metadataResponse.data;
          const priceInEther = formatEther(BigInt(response.data.price));
          response.data.priceInEther = priceInEther.toString();
          setItem(response.data);
        } catch (error) {
          console.error("Failed to fetch item", error);
        }
      };
      fetchItem();
    }
  }, [itemId]);

  const handleBuy = async () => {
    try {
      await buyNFT(itemId as string, item.price);
      alert("Purchase successful!");
    } catch (error) {
      alert("Failed to purchase item");
    }
  };

  if (!item) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Item Details
        </Typography>
        {item.metadata && (
          <>
            <CardMedia
              component="img"
              height="300"
              image={item.metadata.nftImageUrl}
              alt={item.metadata.name}
            />
            <Typography variant="h5" component="h2">
              {item.metadata.name}
            </Typography>
            <Typography variant="body1" paragraph>
              Carbon Credits: {item.metadata.carbonCredits}
            </Typography>
          </>
        )}
        <Typography variant="body1" paragraph>
          Token ID: {item.tokenId}
        </Typography>
        <Typography variant="body1" paragraph>
          Price: {item.priceInEther} ETH
        </Typography>
        <TotalPrice itemId={itemId as string} />
        <Box my={2}>
          <Button variant="contained" color="primary" onClick={handleBuy}>
            Buy Item
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ItemDetail;
