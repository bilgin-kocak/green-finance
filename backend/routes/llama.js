const express = require("express");
const axios = require("axios");
const getPrompt = require("../prompt");
const router = express.Router();

// Replace with your actual EAS endpoint
const LLAMA_EAS_API_URL =
  "http://hackathonllm.5908215374364294.cn-hangzhou.pai-eas.aliyuncs.com";
const token = "Bearer " + process.env.LLAMA_EAS_API_TOKEN;

router.post("/llama", async (req, res) => {
  const { input } = req.body;

  const prompt = getPrompt(input);

  try {
    // SEND post request to Llama EAS API with authorization header
    const response = await axios.post(
      LLAMA_EAS_API_URL,
      { prompt: prompt },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("response", response);

    // const response = await axios.post(LLAMA_EAS_API_URL, { input });
    res.json(response.data);
  } catch (error) {
    console.error("Error interacting with Llama EAS API:", error);
    res.status(500).json({ error: "Failed to interact with Llama EAS API" });
  }
});

module.exports = router;
