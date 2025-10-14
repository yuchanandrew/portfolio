import {
  useCallback,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { easeInOut, motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall - now;
    return func(...args);
  };
}

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  {
    /* ANIMATED DROPDOWN */
  }
  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;

      const centerX = box.width / 2;
      const centerY = box.height / 2;

      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const dropdown = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
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

  {
    /* TODO: Implement logic to follow along which section user is browsing
      on navbar on md-lg viewports */
  }
  // const profileSection = document.getElementById("profile");
  // const [profile, setProfile] = useState(false);

  // const projectSection = document.getElementsByName("skills");
  // const [projects, setProjects] = useState(false);

  // const additionalSection = document.getElementById("additional-skills");
  // const [additionalSkills, setAdditionalSkills] = useState(false);

  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setProfile(true);
  //       } else {
  //         setProfile(false);
  //       }
  //     });
  //   },
  //   { threshold: 0.05 }
  // );

  // observer.observe(profileSection);

  return (
    <div className="sticky top-0 flex flex-col items-center justify-center z-50">
      <div className="backdrop-blur-xl backdrop-hue-rotate-15 gap-8 items-center backdrop-saturate-150 bg-white/10 border-white/20 w-[90vw] flex py-4 z-50 mt-4 mb-4 shadow-xl rounded-full">
        <button
          type="button"
          ref={menu}
          aria-label="Toggle site menu"
          className="ml-4 cursor-pointer transition-all transform hover:scale-105"
        >
          <IoIosMenu size={40} />
        </button>
        <h2 className="flex md:hidden text-3xl font-bold ml-2">Portfolio</h2>
        <button
          onClick={goToProfile}
          type="button"
          aria-label="Navigate to profile section"
          className="hidden md:flex text-2xl font-bold ml-2 cursor-pointer"
        >
          Profile
        </button>
        <button
          onClick={goToSkills}
          type="button"
          aria-label="Navigate to projects section"
          className="hidden md:flex text-2xl font-bold ml-2 cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={goToAdditionalSkills}
          type="button"
          aria-label="Navigate to additional skills section"
          className="hidden md:flex text-2xl font-bold ml-2 cursor-pointer"
        >
          Additional Skill
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-10"></div>
      )}
      {open && (
        <>
          <motion.div
            ref={dropdown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={{ scale: 0.8, rotateX: 0, rotateY: 0 }}
            animate={{ scale: 1, rotateX: rotate.x, rotateY: rotate.y }}
            style={{
              perspective: 1000,
            }}
            transition={{
              type: "spring",
              bounce: 1,
              duration: 0.05,
              ease: easeInOut,
            }}
            className="absolute -top-10 md:top-22 md:left-15 overflow-visible w-full h-[110vh] md:h-[150px] md:w-[40vw] mt-2 z-10
            md:backdrop-blur-2xl rounded-3xl transition-[all_400ms_cubic-bezier(0.030.98,0.52,0.99)_0s] will-change-transform"
          >
            <div className="absolute top-0 py-6 px-4 w-full h-full rounded-3xl z-10 bg-emerald-300 overflow-hidden">
              <div className="absolute -bottom-5 -right-5 text-9xl text-emerald-700/30 z-1 overflow-hidden">
                {/* <FaStar /> */}
                <img
                  src="/assets/halftones_light.png"
                  alt="Halftones/dot matrix backdrop design"
                  className="opacity-20 rounded-3xl z-0"
                />
              </div>
              <div className="flex flex-col mt-30 md:mt-0 space-y-4 justify-center md:justify-start items-center md:items-start">
                <button
                  onClick={() => navigate("/")}
                  className="flex text-2xl w-fit rounded-xl px-4 py-2 text-emerald-700 font-medium transform transition-all hover:bg-emerald-700 hover:text-emerald-300 hover:scale-102 hover:translate-x-5 z-5"
                >
                  Portfolio
                </button>
                <button
                  onClick={() => navigate("/freelance")}
                  className="flex text-2xl w-fit rounded-xl px-4 py-2 text-emerald-700 font-medium transform transition-all hover:bg-emerald-700 hover:text-emerald-300 hover:scale-102 hover:translate-x-5 z-5"
                >
                  Freelance
                </button>
              </div>
            </div>
            {/* Add dropdown menu here */}
            <div className="hidden md:flex absolute top-3 -right-3 z-0 bg-black rounded-3xl w-full h-[150px]"></div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Navigation;
