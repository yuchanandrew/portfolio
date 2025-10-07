import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const dropdown = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!open && menu.current?.contains(e.target as Node)) {
        setOpen(true);
      } else if (
        open &&
        menu.current &&
        !menu.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      } else if (
        open &&
        menu.current &&
        menu.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("profile")?.scrollIntoView({ behavior: "auto" });
    });
  };

  const goToSkills = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "auto" });
    });
  };

  const goToAdditionalSkills = () => {
    navigate("/");

    setTimeout(() => {
      document
        .getElementById("additional-skills")
        ?.scrollIntoView({ behavior: "auto" });
    });
  };

  return (
    <div className="sticky top-0 flex flex-col items-center justify-center z-50">
      <div className="backdrop-blur-xl backdrop-hue-rotate-15 backdrop-saturate-150 bg-white/10 border-white/20 w-[90vw] flex py-4 z-50 mt-4 mb-4 shadow-xl rounded-full">
        <button ref={menu} className="ml-4 hover:scale-105">
          <IoIosMenu size={40} />
        </button>
        <h2 className="text-3xl font-bold ml-2">Portfolio</h2>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-10"></div>
      )}
      {open && (
        <div
          ref={dropdown}
          className="absolute -top-10 md:top-22 md:left-10 py-6 px-4 w-full h-[110vh] md:h-fit md:w-[40vw] mt-2 rounded-3xl z-10 md:z-50 shadow-xl
          bg-emerald-300 md:bg-white/20 md:backdrop-blur-2xl border-white/30 transition-all duration-300"
        >
          <div className="flex flex-col mt-30 md:mt-0 space-y-4 justify-center md:justify-start items-center md:items-start">
            <button
              onClick={goToProfile}
              className="flex text-2xl w-fit rounded-xl px-4 py-2 text-emerald-700 font-medium transform transition-all hover:bg-emerald-700 hover:text-emerald-300 hover:scale-102 hover:translate-x-5"
            >
              Profile
            </button>
            <button
              onClick={goToSkills}
              className="flex text-2xl w-fit rounded-xl px-4 py-2 text-emerald-700 font-medium transform transition-all hover:bg-emerald-700 hover:text-emerald-300 hover:scale-102 hover:translate-x-5"
            >
              Skills
            </button>
            <button
              onClick={goToAdditionalSkills}
              className="flex text-2xl w-fit rounded-xl px-4 py-2 text-emerald-700 font-medium transform transition-all hover:bg-emerald-700 hover:text-emerald-300 hover:scale-102 hover:translate-x-5"
            >
              Additional Skills
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
