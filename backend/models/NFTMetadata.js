// src/models/NFTMetadata.js
const mongoose = require('mongoose');

const nftMetadataSchema = new mongoose.Schema({
  name: String,
  carbonCredits: Number,
  nftImageUrl: String,
  proofOfWorkUrl: String,
});

module.exports = mongoose.model('NFTMetadata', nftMetadataSchema);
