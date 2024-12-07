import React from "react";
import { Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function SearchBar({ searchQuery, setSearchQuery, category, setCategory, sortOrder, setSortOrder }) {
  const categories = [
    { label: "All", value: "" },
    { label: "Technology", value: "technology" },
    { label: "Business", value: "business" },
    { label: "Health", value: "health" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Sports", value: "sports" },
    { label: "Science", value: "science" },
  ];

  return (
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={2} justifyContent="center">
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ flex: 1, minWidth: "200px" }}
      />

      <FormControl size="small" sx={{ minWidth: "170px" }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: "170px" }}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort"
        >
          <MenuItem value="Newest">Newest</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
          <MenuItem value="Alphabetical">Alphabetical</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SearchBar;
