import React, { useRef } from "react";
import Typing from "./Typing";

import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useSpring,
} from "framer-motion";
import Socials from "./Socials";

const Profile = () => {
  const useParallax = (value: MotionValue<number>, distance: number) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 1000;
    const scaledHeight = distance * (vh / 1000);
    return useTransform(value, [0, 1], [scaledHeight, 0]);
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const y = useParallax(scrollYProgress, 300);

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
            <Socials />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex w-full md:w-2/3">
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
