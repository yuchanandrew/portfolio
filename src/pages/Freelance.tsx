import React from "react";

const Freelance = () => {
  return (
    <div className="flex w-full h-[calc(100vh-6.75rem)] justify-center items-center">
      <div className="grid grid-cols-2 gap-12 w-9/10">
        {/* TEXT */}
        <div className="flex flex-col justify-center items-start w-full">
          <h2 className="flex text-6xl font-semibold mb-12">Freelance</h2>
          <p
            style={{ fontStyle: "italic" }}
            className="flex text-2xl font-light"
          >
            by andrew rho
          </p>
        </div>
        {/* MEDIA */}
        <div className="flex">
          <h2 style={{ fontStyle: "italic" }} className="">
            (coming soon!!)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Freelance;
