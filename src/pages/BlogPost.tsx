import axios from "axios";
import { Vibrant } from "node-vibrant/worker";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

{
  /*
    TODO: Format individual blogs with title, content,
*/
}

type Post = {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
  time_created: string;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BlogPost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [stringDate, setStringDate] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:3000/get-posts/${id}`);
    const result = response.data.post[0];

    console.log("response: ", response.data.post[0]);
    setCurrentPost(result);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // Converting time stamp to date
  const formatTime = async (date: string) => {
    const year = date.substring(0, 4);
    const month_numerical = Number(date.substring(5, 7));
    const day = date.substring(8, 10);

    const month = months[month_numerical - 1];

    const return_string = `${month} ${day}, ${year}`;

    console.log("String date: ", return_string);

    setStringDate(return_string);
  };

  useEffect(() => {
    if (!currentPost?.time_created) return;
    else {
      formatTime(currentPost?.time_created);
    }
  }, [currentPost]);

  {
    /* TODO: Function to extract primary color from image */
  }
  //   const extractColor = async (src: string) => {
  //     const palette = await Vibrant.from(src).getPalette();

  //     console.log("Value: ", palette);
  //   };

  //   useEffect(() => {
  //     if (!currentPost?.image) return;

  //     extractColor(currentPost?.image);
  //   }, [currentPost?.image]);
  return (
    <div className="flex flex-col min-h-[calc(100vh-6.75rem)] justify-start items-center w-full">
      <div className="flex flex-col w-9/10 justify-center items-center">
        <img
          style={{ background: "white" }}
          src={currentPost?.image}
          alt={currentPost?.description}
          className="rounded-2xl w-full h-[35vh] aspect-square object-contain mask-b-from-60%"
        />
        <h2 className="text-7xl font-medium w-2/3 text-center">
          {currentPost?.title}
        </h2>
        <div className="flex w-full mt-8 justify-center">
          <p style={{ fontStyle: "italic" }} className="text-lg">
            {stringDate}
          </p>
        </div>
        <div className="flex border-2 border-slate-500/50 rounded-full w-2/3 mt-8 mb-8" />

        {/* POST CONTENT */}
        <div className="flex w-9/10">
          <p className="text-lg">{currentPost?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
