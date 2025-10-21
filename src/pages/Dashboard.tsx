import axios from "axios";
import React, { useState } from "react";

const Dashboard = () => {
  const [title, setTitle] = useState<null | string>(null);
  const [image, setImage] = useState<null | string>(null);
  const [description, setDescription] = useState<null | string>(null);
  const [content, setContent] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api2.andrewrho.dev/make-post`,
        {
          title,
          image,
          description,
          content,
        }
      );

      const data = response.data.message;

      console.log("Message: ", data);

      alert("Worked, message is posted!");

      setTitle(null);
      setImage(null);
      setDescription(null);
      setContent(null);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
  return (
    <div className="flex flex-col w-full h-[calc(100vh-6.75rem)] items-center">
      <div className="flex flex-col w-9/10 bg-slate-300 min-h-[50vh] rounded-3xl justify-center items-center py-4">
        <h2 className="flex text-5xl mb-8">Make a post</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-8 w-full px-8"
        >
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="dashboard-field"
              type="text"
              value={title ? title : ""}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give a title..."
              required
            />
            <label htmlFor="image">Image</label>
            <input
              id="image"
              className="dashboard-field"
              type="text"
              value={image ? image : ""}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Give an image..."
              required
            />
            <label htmlFor="image-description">Image Description</label>
            <input
              id="image-description"
              className="dashboard-field"
              type="text"
              value={description ? description : ""}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give a description for image above..."
              required
            />
          </div>

          <div className="flex flex-col h-full">
            <label htmlFor="content">Content</label>
            <div className="flex bg-slate-300 h-full justify-start items-start">
              <input
                id="content"
                className="flex dashboard-field h-full"
                type="text"
                value={content ? content : ""}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write the content..."
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex bg-emerald-500 col-span-2 py-4 px-2 w-full rounded-2xl justify-center items-center mt-8 shadow-2xl transform transition-all hover:bg-emerald-300 hover:scale-102 hover:-translate-y-1 ease-in-out"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
