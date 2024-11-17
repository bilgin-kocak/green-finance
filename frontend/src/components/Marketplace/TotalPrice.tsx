import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getTotalPrice } from "../../services/marketplace";
import { formatEther } from "viem";

interface TotalPriceProps {
  itemId: string;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ itemId }) => {
  const [totalPrice, setTotalPrice] = useState<string>("");

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const response = await getTotalPrice(itemId);
        const totalPrice = response.data.totalPrice;
        const totalPriceInEther = formatEther(BigInt(totalPrice));
        setTotalPrice(totalPriceInEther);
      } catch (error) {
        console.error("Failed to fetch total price", error);
      }
    };
    fetchTotalPrice();
  }, [itemId]);

  return (
    <Typography variant="body1" paragraph>
      Total Price (including fees): {totalPrice} ETH
    </Typography>
  );
};

export default TotalPrice;
