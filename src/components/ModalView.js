import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

function ModalView({ post, onClose }) {
  return (
    <Modal open={true} onClose={onClose}>
      <Box className="modal-content">
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.date} | {post.category}
        </Typography>
        <Typography variant="body1" mt={2}>
          {post.content}
        </Typography>
        <Button onClick={onClose} variant="contained" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalView;
