import axios from "axios";
import { easeInOut, motion, scale, spring } from "framer-motion";
import { title } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface BlogProps {
  id: number;
  title: string;
  image: string;
  description: string;
  content: string;
  date: string;
}

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

const BlogCard = ({
  id,
  title,
  image,
  description,
  content,
  date,
}: BlogProps) => {
  const [stringDate, setStringDate] = useState<string | null>(null);
  const navigate = useNavigate();

  // Converting time stamp to date
  const formatTime = async (date: string) => {
    const year = date.substring(0, 4);
    const month_numerical = Number(date.substring(5, 7));
    const day = date.substring(8, 10);

    const month = months[month_numerical - 1];

    const return_string = `${month} ${day}, ${year}`;

    setStringDate(return_string);
  };

  useEffect(() => {
    formatTime(date);
  }, [date]);
  return (
    <motion.div
      initial={{ scale: 1, filter: "brightness(1)" }}
      whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
      transition={{
        ease: easeInOut,
        duration: 0,
        type: spring,
      }}
      onClick={() => navigate(`${id}`)}
      className="flex relative flex-col bg-slate-300 
      rounded-2xl justify-center items-center overflow-hidden m-4 shadow-xl
      transition-all transform hover:cursor-pointer"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="flex relative h-[50vh] justify-center items-center w-full">
          <img
            src={image}
            style={{ backgroundColor: "white" }}
            alt={description}
            className="absolute top-0 flex w-full md:w-full h-full aspect-square object-cover mask-b-from-10% md:mask-b-to-1000% md:mask-r-from-10%"
          />
        </div>
        <div className="relative flex flex-col px-4 h-full">
          <h2 className="flex text-3xl font-medium mt-4 mb-4">{title}</h2>
          <p className="flex mb-4 font-light">{content}</p>
          <p className="relative md:absolute md:bottom-0 flex mb-4 text-slate-600 font-light">
            Made on {stringDate}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
