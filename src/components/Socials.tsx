import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Appearance {
  icon: string;
  background: string;
}

{
  /* TODO: Add props implementation into the code */
}

const Socials = () => {
  return (
    <div className="grid grid-cols-3 gap-8 z-2">
      <Link
        to="https://github.com/yuchanandrew"
        className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
      >
        <FaGithub />
      </Link>
      <Link
        to="https://www.instagram.com/yuchanandrew/"
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
  );
};

export default Socials;
