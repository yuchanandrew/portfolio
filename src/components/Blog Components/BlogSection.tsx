import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const myFirstBlogPost = {
  id: 1,
  title: "This is my first blog post",
  image:
    "https://bluemoji.io/cdn-proxy/646218c67da47160c64a84d5/64fae957204ee03fb06e3e02_92.png",
  description: "Smiley emoji with its thumbs up",
  content:
    "Very exciting things are coming this way! This is the first blog post, although it definitely is just a test blog post",
  date: Date.now(),
};

type Post = {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
  time_created: string;
};

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchAllBlogs = async () => {
    const response = await axios.get("https://api3.andrewrho.dev/get-posts");
    const data = response.data.posts;

    console.log("Data: ", data);

    // Set the posts to the array of posts retrieved in data
    setPosts(data);
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(45deg, var(--color-emerald-700), var(--color-emerald-300)",
      }}
      className="flex min-h-screen w-full justify-center"
    >
      <div className="flex flex-col justify-start w-9/10">
        <h2 className="flex text-5xl mt-8">My Blog Posts</h2>
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            title={post.title}
            image={post.image}
            description={post.description}
            content={post.content}
            date={post.time_created}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
