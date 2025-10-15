import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

interface Appearance {
  icon: string;
  background: string;
}

{
  /* TODO: Add props implementation into the code */
}

const Socials = () => {
  return (
    <div className="grid grid-cols-3 gap-8 z-20">
      <a
        href="https://github.com/yuchanandrew"
        aria-label="Link to my Github page"
        className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.instagram.com/yuchanandrew/"
        aria-label="Link to my Instagram page"
        className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
      >
        <FaInstagram />
      </a>
      <a
        href="https://www.linkedin.com/in/andrew-rho-4b3940154/"
        aria-label="Link to my LinkedIn page"
        className="text-3xl py-2 px-2 rounded-full transition-all transform hover:bg-emerald-700 hover:text-emerald-300 hover:scale-105"
      >
        <FaLinkedin />
      </a>
    </div>
  );
};

export default Socials;
