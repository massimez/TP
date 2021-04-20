import React, {  useState, useEffect } from "react";
import axios from "axios";
import { Students } from "../Students";
import { PagiNext } from "../PagiNext";
import { Box } from "@chakra-ui/layout";

const Pagnation = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

//Get current student index
const indexOfLast = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLast - postsPerPage;
const currrentPosts = posts.slice(indexOfFirstPost,indexOfLast)
// Change page
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box>
       <Students posts={currrentPosts} loading={loading} />
       <PagiNext 
      postsPerPage={postsPerPage} 
      totalPosts={posts.length} 
      paginate={paginate} />
    </Box>
  );
};

export default Pagnation;
