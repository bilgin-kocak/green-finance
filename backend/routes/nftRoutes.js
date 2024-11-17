const express = require("express");
const NFT = require("../models/NFT");
const NFTMetadata = require("../models/NFTMetadata");
const { upload, uploadToOSS } = require("../middleware/upload");

const router = express.Router();

// Create NFT Metadata
router.post(
  "/upload",
  upload.fields([
    { name: "nftImage", maxCount: 1 },
    { name: "proofOfWork", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, carbonCredits } = req.body;
      const nftImageUrl = await uploadToOSS(req.files.nftImage[0]);
      const proofOfWorkUrl = await uploadToOSS(req.files.proofOfWork[0]);

      const newMetadata = new NFTMetadata({
        name,
        carbonCredits,
        nftImageUrl,
        proofOfWorkUrl,
      });

      await newMetadata.save();

      // Construct the tokenURI (URL to access the metadata)
      const tokenURI = `${req.protocol}://${req.get("host")}/api/nft/metadata/${
        newMetadata._id
      }`;

      res.status(201).send({ tokenURI });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get("/metadata/:id", async (req, res) => {
  try {
    const metadata = await NFTMetadata.findById(req.params.id);
    if (!metadata) {
      return res.status(404).send({ message: "Metadata not found" });
    }
    res.send(metadata);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// Update NFT Metadata
router.put("/metadata/:tokenId", async (req, res) => {
  try {
    const nft = await NFT.findOneAndUpdate(
      { tokenId: req.params.tokenId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!nft) {
      return res.status(404).send({ message: "NFT metadata not found" });
    }
    res.send({ message: "NFT metadata updated successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete NFT Metadata
router.delete("/metadata/:tokenId", async (req, res) => {
  try {
    const nft = await NFT.findOneAndDelete({ tokenId: req.params.tokenId });
    if (!nft) {
      return res.status(404).send({ message: "NFT metadata not found" });
    }
    res.send({ message: "NFT metadata deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
