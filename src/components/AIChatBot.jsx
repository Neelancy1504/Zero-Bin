// import React, { useState } from "react";
// import {
//   Fab,
//   Drawer,
//   Box,
//   TextField,
//   IconButton,
//   Paper,
//   Typography,
// } from "@mui/material";
// import {
//   Chat as ChatIcon,
//   Close as CloseIcon,
//   Send as SendIcon,
//   Image as ImageIcon,
// } from "@mui/icons-material";

// const AIChatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [messages, setMessages] = useState([
//     {
//       text: "Hi there! I'm your AI assistant. How can I help you today?",
//       sender: "ai",
//     },
//   ]);

//   const handleSend = () => {
//     if (message.trim() || imageFile) {
//       const newMessage = {
//         text: message,
//         sender: "user",
//         image: imageFile,
//       };

//       setMessages([...messages, newMessage]);

//       // Simulate AI response (replace with actual AI logic)
//       const aiResponse = {
//         text: "I received your message. How can I assist you further?",
//         sender: "ai",
//       };

//       setTimeout(() => {
//         setMessages((prev) => [...prev, aiResponse]);
//       }, 1000);

//       setMessage("");
//       setImageFile(null);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImageFile(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <>
//       <Fab
//         color="primary"
//         aria-label="chat"
//         onClick={() => setOpen(!open)}
//         sx={{
//           position: "fixed",
//           bottom: 16,
//           left: 16,
//           zIndex: 1000,
//         }}
//       >
//         <ChatIcon />
//       </Fab>

//       <Drawer
//         anchor="bottom"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           sx: {
//             height: "80vh",
//             borderTopLeftRadius: 20,
//             borderTopRightRadius: 20,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             height: "100%",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               p: 2,
//               borderBottom: "1px solid #eee",
//             }}
//           >
//             <Typography variant="h6">AI Assistant</Typography>
//             <IconButton onClick={() => setOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           <Box
//             sx={{
//               flexGrow: 1,
//               overflowY: "auto",
//               p: 2,
//             }}
//           >
//             {messages.map((msg, index) => (
//               <Paper
//                 key={index}
//                 sx={{
//                   p: 2,
//                   mb: 2,
//                   alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//                   bgcolor: msg.sender === "user" ? "primary.light" : "grey.200",
//                   color: msg.sender === "user" ? "white" : "black",
//                   maxWidth: "70%",
//                 }}
//               >
//                 {msg.image && (
//                   <img
//                     src={msg.image}
//                     alt="Uploaded"
//                     style={{
//                       maxWidth: "100%",
//                       borderRadius: 8,
//                       marginBottom: 8,
//                     }}
//                   />
//                 )}
//                 <Typography>{msg.text}</Typography>
//               </Paper>
//             ))}
//           </Box>

//           {imageFile && (
//             <Box sx={{ p: 2 }}>
//               <img
//                 src={imageFile}
//                 alt="Preview"
//                 style={{
//                   maxWidth: 100,
//                   borderRadius: 8,
//                 }}
//               />
//             </Box>
//           )}

//           <Box
//             sx={{
//               display: "flex",
//               p: 2,
//               gap: 1,
//             }}
//           >
//             <input
//               accept="image/*"
//               style={{ display: "none" }}
//               id="raised-button-file"
//               type="file"
//               onChange={handleImageUpload}
//             />
//             <label htmlFor="raised-button-file">
//               <IconButton component="span">
//                 <ImageIcon />
//               </IconButton>
//             </label>

//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSend()}
//             />

//             <IconButton onClick={handleSend}>
//               <SendIcon />
//             </IconButton>
//           </Box>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default AIChatbot;
import React, { useState } from "react";
import {
  Fab,
  Drawer,
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  Image as ImageIcon,
} from "@mui/icons-material";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm your AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);

  const handleSend = () => {
    if (message.trim() || imageFile) {
      const newMessage = {
        text: message,
        sender: "user",
        image: imageFile,
      };

      setMessages([...messages, newMessage]);

      const aiResponse = {
        text: "I received your message. How can I assist you further?",
        sender: "ai",
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setMessage("");
      setImageFile(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </Fab>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: "50vh",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxWidth: 400,
            margin: "auto",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography variant="h6">AI Assistant</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
            }}
          >
            {messages.map((msg, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  bgcolor: msg.sender === "user" ? "primary.light" : "grey.200",
                  color: msg.sender === "user" ? "white" : "black",
                  maxWidth: "70%",
                }}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Uploaded"
                    style={{
                      maxWidth: "100%",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  />
                )}
                <Typography>{msg.text}</Typography>
              </Paper>
            ))}
          </Box>

          {imageFile && (
            <Box sx={{ p: 2 }}>
              <img
                src={imageFile}
                alt="Preview"
                style={{
                  maxWidth: 100,
                  borderRadius: 8,
                }}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              p: 2,
              gap: 1,
            }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="raised-button-file">
              <IconButton component="span">
                <ImageIcon />
              </IconButton>
            </label>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />

            <IconButton onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default AIChatbot;
