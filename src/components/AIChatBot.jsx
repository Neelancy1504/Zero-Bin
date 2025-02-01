import React, { useState } from "react";
import {
  Fab,
  Drawer,
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // Optional: For code highlighting
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // Optional: Code highlighting style
import GeminiService from "./GeminiService";
import assistantIcon from "./images/assistant.png";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm your AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);

  const handleSendMessage = async () => {
    if (message.trim() === "" && !imageFile) return;

    const newMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await GeminiService.getGeminiResponse(
        message,
        imageFile
      );
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I encountered an error. Please try again.",
          sender: "ai",
        },
      ]);
    } finally {
      setLoading(false);
      setImageFile(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <Fab
        color="blue"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          overflow: "hidden",
          "& img": {
            width: "60%",
            height: "60%",
            objectFit: "cover",
          },
        }}
      >
        <img src={assistantIcon} alt="AI Assistant" />
      </Fab>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          p={2}
          width={400}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">AI Assistant Powered by Gemini</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            flex={1}
            mt={2}
            sx={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 2,
                  maxWidth: "85%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    msg.sender === "user"
                      ? "primary.light"
                      : "background.paper",
                  color: msg.sender === "user" ? "white" : "text.primary",
                }}
              >
                {/* Use ReactMarkdown to render the message */}
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={materialDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </Paper>
            ))}
          </Box>

          {imageFile && (
            <Box mt={1}>
              <Typography variant="caption" color="primary">
                Image selected: {imageFile.name}
              </Typography>
            </Box>
          )}

          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
              multiline
              maxRows={4}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" component="span" disabled={loading}>
                <ImageIcon />
              </IconButton>
            </label>
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={loading || (message.trim() === "" && !imageFile)}
            >
              {loading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default AIChatbot;
