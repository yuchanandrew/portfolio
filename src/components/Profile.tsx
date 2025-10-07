import React, { useRef } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Typing from "./Typing";

import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useSpring,
} from "framer-motion";

const Profile = () => {
  const useParallax = (value: MotionValue<number>, distance: number) => {
    return useTransform(
      value,
      [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
      [
        0,
        distance + 10,
        distance + 20,
        distance + 30,
        distance + 40,
        distance + 50,
        distance + 60,
        distance + 70,
        distance + 80,
        distance + 90,
        distance + 100,
      ]
    );
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const y = useParallax(scrollYProgress, 0);

  return (
    <motion.section
      id="profile"
      className="flex w-full h-[calc(100vh-6.75rem)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Main profile */}
      <div className="relative flex w-full">
        <div className="flex w-full justify-center items-start md:justify-start md:items-center md:px-16">
          <div className="flex flex-col justify-center items-start">
            <h2 className="flex text-6xl font-semibold text-emerald-200 mb-2 bg-emerald-700 rounded-xl py-2 px-2">
              Hello, I am
            </h2>
            <h2 className="flex text-6xl font-semibold mb-2 z-1">Andrew Rho</h2>
            {/* <img src="../public/name.png" alt="name" className="scale-110" /> */}
            {/* <p className="flex text-3xl font-medium text-emerald-700 px-4 mb-4 z-1">
              Full Stack Developer
            </p> */}
            <Typing />
            <div className="grid grid-cols-3 gap-8 z-1">
              <Link
                to="https://github.com/yuchanandrew"
                className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
              >
                <FaGithub />
              </Link>
              <Link
                to="https://github.com/yuchanandrew"
                className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
              >
                <FaInstagram />
              </Link>
              <Link
                to="https://www.linkedin.com/in/andrew-rho-4b3940154/"
                className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex w-2/3">
          <div className="flex frame justify-end items-end">
            <div className="flex polygon z-0" />
            <motion.img
              src="/me_nobg_transparent_right_resize_nopants.png"
              alt="andrew"
              ref={ref}
              style={{ y }}
              className="flex profile lg:w-3/4 md:w-3/4 sm:w-3/4 aspect-square object-contain z-1"
            />
            <div className="flex triangle shadow-xl" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Profile;
