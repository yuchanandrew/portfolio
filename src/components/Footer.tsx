import React from "react";
import Socials from "./Socials";

const Footer = () => {
  return (
    <div className="relative flex h-[50vh] w-full bg-emerald-700 border-t-4 border-emerald-500 overflow-hidden">
      {/* DECAL */}
      <div className="absolute right-0 -top-40">
        <img
          src="/assets/splash_dark.png"
          alt="Dark splash decal"
          className="w-full opacity-30 object-cover scale-150 md:scale-110 lg:scale-100"
        />
      </div>
      <div className="absolute bottom-0 right-0">
        <div className="relative flex flex-col w-fit justify-center items-center p-2 z-50">
          <h2 className="text-3xl text-emerald-200">My Socials</h2>
          <Socials />
        </div>
      </div>
      <div className="absolute top-0 sm:left-0 md:right-0 w-full text-5xl md:text-9xl font-bold text-emerald-300 opacity-30 z-1">
        a.rho
      </div>
      <div className="absolute bottom-0 left-0 w-full text-emerald-200 text-2xl p-2 z-5">
        Copyright © Andrew Rho 2025
      </div>
    </div>
  );
};

export default Footer;
