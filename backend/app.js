const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nftMetadataRoutes = require("./routes/nftRoutes");
const userRoutes = require("./routes/users");
const marketplaceRoutes = require("./routes/marketplace");
const llamaRoutes = require("./routes/llama");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/nft", nftMetadataRoutes);
app.use("/api/users", userRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api", llamaRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
