import React from "react";
import BlogSection from "../components/Blog Components/BlogSection";

const Blog = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-6.75rem)] justify-center items-center">
      <div className="flex flex-col justify-center items-center h-screen">
        <h2 className="flex text-5xl font-semibold mb-8">Blog</h2>
        <p
          style={{ fontStyle: "italic" }}
          className="flex text-2xl font-medium"
        >
          By Andrew
        </p>
      </div>
      {/* Actual Blog */}
      <BlogSection />
    </div>
  );
};

export default Blog;
