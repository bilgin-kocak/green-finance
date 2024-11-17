const express = require("express");
const router = express.Router();
const { ethers, Contract } = require("ethers");

// Import ABI and Contract Address
const MarketplaceABI = require("../abis/Marketplace.json");
const nftABI = require("../abis/NFT.json");
const marketplaceAddress = "0x55Df488a87496861666b4467C4E8A750fCf82D31";
const nftAddress = "0x717B39602E8CabB14552E5C6D12f3e09C5993754";

// Connect to the blockchain
const provider = new ethers.providers.JsonRpcProvider(
  "https://ethereum-sepolia-rpc.publicnode.com"
  // "https://1rpc.io/sepolia"
);
const marketplaceContract = new ethers.Contract(
  marketplaceAddress,
  MarketplaceABI,
  provider
);

const nftContract = new Contract(nftAddress, nftABI, provider);

// Get Marketplace Items
router.get("/items", async (req, res) => {
  try {
    const itemCount = await marketplaceContract.getItemCount();
    let items = [];
    for (let i = 5; i <= itemCount; i++) {
      const item = await marketplaceContract.items(i);
      const itemObj = {
        itemId: item[0].toString(),
        contractAddress: item[1],
        tokenId: item[2].toString(),
        price: item[3].toString(),
        seller: item[4],
        sold: item[5],
      };
      if (itemObj.sold) {
        continue;
      }
      const tokenUri = await nftContract.tokenURI(itemObj.tokenId);
      itemObj.tokenUri = tokenUri;

      if (!item.sold) {
        items.push(itemObj);
      }
    }
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get Item
router.get("/item/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await marketplaceContract.items(itemId);
    const itemObj = {
      itemId: item[0].toString(),
      contractAddress: item[1],
      tokenId: item[2].toString(),
      price: item[3].toString(),
      seller: item[4],
      sold: item[5],
    };

    const tokenUri = await nftContract.tokenURI(itemObj.tokenId);
    itemObj.tokenUri = tokenUri;
    res.status(200).send(itemObj);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get Total Price
router.get("/totalPrice/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const totalPrice = await marketplaceContract.getTotalPrice(itemId);
    res.status(200).send({ totalPrice: totalPrice.toString() });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
