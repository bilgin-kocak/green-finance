import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import {
  mintNFT,
  approveNFT,
  saleNFT,
  getTokenCount,
  isApproved,
} from "../../services/nft";
import { marketplaceContractAddress, nftContractAddress } from "@/config";
import { ethers } from "ethers";

const MintNFT: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    carbonCredits: "",
    price: "",
    nftImage: null as File | null,
    proofOfWork: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("carbonCredits", formData.carbonCredits);
    if (formData.nftImage)
      formDataToSubmit.append("nftImage", formData.nftImage);
    if (formData.proofOfWork)
      formDataToSubmit.append("proofOfWork", formData.proofOfWork);

    console.log("price", formData.price);

    try {
      console.log("formDataToSubmit:", formDataToSubmit);
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://8.211.9.61:3001/api";
      const response = await axios.post(
        `${backendUrl}/nft/upload`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { tokenURI } = response.data;

      // Here you should call the mintNFT function with the tokenURI
      const tokenCount = (await getTokenCount()).toString();

      await mintNFT(tokenURI);
      console.log("NFT minted successfully");

      const approved = await isApproved();
      if (!approved) {
        await approveNFT();
        console.log("NFT approved successfully");
      }
      const priceInWei = ethers.utils.parseEther(formData.price);
      await saleNFT(tokenCount, priceInWei.toString(), nftContractAddress);
      console.log("NFT put up for sale successfully");
      alert("NFT put up for sale successfully");
    } catch (error) {
      console.log("error:", error);
      alert("Failed to mint NFT");
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Apply for new NFT
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="NFT Name"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="carbonCredits"
            label="Carbon Credits Generated"
            type="number"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="Price in ETH"
            type="float"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="nft-image"
            type="file"
            name="nftImage"
            onChange={handleFileChange}
          />
          <label htmlFor="nft-image">
            <Button variant="contained" component="span">
              Upload NFT Image
            </Button>
          </label>
          {formData.nftImage && (
            <Typography>{formData.nftImage.name}</Typography>
          )}
          <input
            accept="application/pdf"
            style={{ display: "none" }}
            id="proof-of-work"
            type="file"
            name="proofOfWork"
            onChange={handleFileChange}
          />
          <label htmlFor="proof-of-work">
            <Button variant="contained" component="span">
              Upload Proof-of-Work
            </Button>
          </label>
          {formData.proofOfWork && (
            <Typography>{formData.proofOfWork.name}</Typography>
          )}
          <Box my={2}>
            <Button type="submit" variant="contained" color="primary">
              Verify Data
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "10px" }}
            >
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default MintNFT;
