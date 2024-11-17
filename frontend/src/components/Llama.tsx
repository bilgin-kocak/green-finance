import React, { useState } from "react";
import { getAIBotResponse } from "../services/marketplace";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import parse from "html-react-parser";
import parseMarkup from "../utils/markupParser";

const Llama: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await getAIBotResponse(input);
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error interacting with LLM API:", error);
      setResponse("Failed to get response from LLM API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          EcoTokenize AI Bot
        </Typography>
        <TextField
          label="Type your input"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          margin="normal"
        />
        <Box my={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send"}
          </Button>
        </Box>
        {response && (
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              Response:
            </Typography>
            <Paper elevation={3} style={{ padding: "16px", textAlign: "left" }}>
              {typeof response === "string" ? parseMarkup(response) : response}
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Llama;
