import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import { posts } from "../../contents";
import Post from "../../components/Post/Post";
import CreatePosts from "../../components/CreatePosts/CreatePosts";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then(({ data }) => setPosts(data.posts));
  }, [posts]);

  return (
    <>
      <Navbar />

      <div className="w-3/4 mx-auto">
        <CreatePosts />
        {posts.length > 0
          ? posts.map((props, key) => <Post {...props} key={key} />)
          : "loading..."}
      </div>
    </>
  );
};

export default Home;
