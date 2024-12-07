import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Pagination, Paper, CircularProgress, Grid } from "@mui/material";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import PostCard from "./components/PostCard";
import ModalView from "./components/ModalView";

const API_KEY = "bbb71c53a88544cc8273b94eaf934558";
const BASE_URL = "https://newsapi.org/v2/top-headlines?country=us";

const POSTS_PER_PAGE = 8;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(BASE_URL, {
          params: {
            apiKey: API_KEY,
            category: category || undefined,
            q: searchQuery || undefined,
            pageSize: 100,
          },
        });
        setNewsArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  const filteredPosts = newsArticles
    .filter((article) => article.title && !article.title.includes("[Removed]"))
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      } else if (sortOrder === "Oldest") {
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <Banner />
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              {filteredPosts.length} result{filteredPosts.length !== 1 && "s"} found
            </Typography>

            <Grid
              container
              spacing={3}
              sx={{
                width: "90%",
                justifyContent: "center",
                paddingBottom: "20px",
              }}
            >
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((article, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={index}
                  >
                    <PostCard
                      post={{
                        title: article.title,
                        category: article.source.name,
                        content: article.description,
                        date: new Date(article.publishedAt).toLocaleDateString(),
                        url: article.url,
                        urlToImage: article.urlToImage,
                      }}
                      searchQuery={searchQuery}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>No results found.</Typography>
              )}
            </Grid>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

        {selectedPost && (
          <ModalView post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </Paper>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          backgroundColor: "#282c34",
          color: "#fff",
          padding: "20px 0",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center", 
          gap: "20px", 
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2" color="inherit">
          E-mail: 
          <a href="mailto:siddhantdixit97@gmail.com" style={{ color: "#fff", textDecoration: "none" }}>
            siddhantdixit97@gmail.com
          </a>
        </Typography>
        <Typography variant="body2" color="inherit">
          &copy; {new Date().getFullYear()} My News App. No rights reserved ;)
        </Typography>
        <Typography variant="body2" color="inherit">
          Phone: 
          <a href="tel:+918299172714" style={{ color: "#fff", textDecoration: "none" }}>
            +91-8299172714
          </a>
        </Typography>
      </Box>
    </>
  );
}

export default App;
