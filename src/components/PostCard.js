import React from "react";
import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";

function PostCard({ post, searchQuery }) {
  const highlightSearchTerm = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  };

  return (
    <Link
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease",
          },
          minHeight: "400px",
        }}
      >
        {post.urlToImage ? (
          <CardMedia
            component="img"
            image={post.urlToImage}
            alt={post.title}
            sx={{
              width: "100%",
              height: "180px",
            }}
          />
        ) : (
          <CardMedia
            component="div"
            sx={{
              width: "100%",
              height: "180px",
              backgroundColor: "#f0f0f0",
            }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            dangerouslySetInnerHTML={{ __html: highlightSearchTerm(post.title) }}
            gutterBottom
          />
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {post.date} | {post.category}
          </Typography>
          <Typography variant="body2">
            {post.content ? post.content.substring(0, 100) + "..." : "No description available."}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PostCard;
