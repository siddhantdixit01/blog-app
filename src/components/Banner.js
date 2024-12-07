import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const bannerImages = ["/images/banner/image1.jpg", "/images/banner/image2.jpg", "/images/banner/image3.jpg"];

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: "250px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
    >
      {bannerImages.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`Banner ${index}`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === currentImageIndex ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          color: "#fff",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          News
        </Typography>
        <Typography variant="h6">Stay updated, Stay tuned!</Typography>
      </Box>
    </Box>
  );
}

export default Banner;
