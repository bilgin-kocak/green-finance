const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  trait_type: String,
  value: String
});

const nftSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  name: String,
  description: String,
  image: String,
  attributes: [attributeSchema]
});

module.exports = mongoose.model('NFT', nftSchema);
