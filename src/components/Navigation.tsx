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
  const navRef = useRef(null);

  {
    /* CURSOR FOLLOW */
  }

  useEffect(() => {
    const navbar: any = navRef.current;
    if (!navbar) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = navbar?.getBoundingClientRect();
      const x = e.clientX - rect?.left;
      const y = e.clientY - rect?.top;

      navbar.style.setProperty("--x", `${x}`);
      navbar.style.setProperty("--y", `${y}`);
    };

    navbar.addEventListener("mousemove", handleMouseMove);

    return () => {
      navbar.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  {
    /***************** NAVIGATION *****************/
  }

  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("profile")?.scrollIntoView({ behavior: "auto" });
    });
  };

  const goToAbout = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "auto" });
    });
  };

  const goToSkills = () => {
    navigate("/");

    setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "auto" });
    });
  };

  const goToTechStacks = () => {
    navigate("/");

    setTimeout(() => {
      document
        .getElementById("additional-skills")
        ?.scrollIntoView({ behavior: "auto" });
    });
  };

  {
    /***************** OBSERVERS *****************/
  }

  function useSectionObserver(id: string, ratio: number) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              // console.log(`Intersecting with ${id}`); // For developmental testing
            } else {
              setIsVisible(false);
            }
          });
        },
        { threshold: ratio }
      );

      observer.observe(section);

      return () => observer.disconnect();
    }, [id, ratio]);

    return isVisible;
  }

  const profileObserver = useSectionObserver("profile", 0.5);
  const aboutObserver = useSectionObserver("about", 0.5);
  const projectObserver = useSectionObserver("skills", 0.5);
  const techObserver = useSectionObserver("additional-skills", 0.5);

  return (
    <div className="sticky top-0 flex flex-col items-center justify-center z-50">
      <div ref={navRef} className="navigation">
        <button
          type="button"
          ref={menu}
          aria-label="Toggle site menu"
          className="ml-4 cursor-pointer transition-all transform hover:scale-105 z-10"
        >
          <IoIosMenu size={40} />
        </button>
        <h2 className="flex md:hidden text-2xl font-medium ml-2 z-10">
          Portfolio
        </h2>

        {/* Profile */}
        <button
          onClick={goToProfile}
          type="button"
          aria-label="Navigate to profile section"
          className="hidden relative md:flex text-2xl justify-center items-center
          font-medium ml-2 cursor-pointer z-10 h-full"
        >
          {profileObserver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: easeInOut }}
              className="tab-underline"
            />
          )}
          <div className="relative heading-div">
            <div className="selector z-1" />
            <motion.h2
              initial={{ scale: 1 }}
              animate={profileObserver ? { scale: 1.05 } : { scale: 1 }}
              className="flex text-2xl font-medium z-5 navigation-option"
            >
              <h2 className="z-5">Profile</h2>
            </motion.h2>
          </div>
        </button>

        {/* About Me */}
        <button
          onClick={goToAbout}
          type="button"
          aria-label="Navigate to about me section"
          className="hidden relative md:flex text-2xl justify-center items-center
          font-medium ml-2 cursor-pointer z-10 h-full"
        >
          {aboutObserver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: easeInOut }}
              className="tab-underline"
            />
          )}
          <div className="relative heading-div">
            <div className="selector z-1" />
            <motion.h2
              initial={{ scale: 1 }}
              animate={aboutObserver ? { scale: 1.05 } : { scale: 1 }}
              className="flex text-2xl font-medium z-5 navigation-option"
            >
              About
            </motion.h2>
          </div>
        </button>

        {/* Projects */}
        <button
          onClick={goToSkills}
          type="button"
          aria-label="Navigate to projects section"
          className="hidden relative md:flex justify-center items-center 
          ml-2 cursor-pointer z-10 h-full"
        >
          {projectObserver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: easeInOut }}
              className="tab-underline"
            />
          )}
          <div className="relative heading-div">
            <div className="selector z-1" />
            <motion.h2
              initial={{ scale: 1 }}
              animate={projectObserver ? { scale: 1.05 } : { scale: 1 }}
              className="flex text-2xl font-medium z-5 navigation-option"
            >
              Projects
            </motion.h2>
          </div>
        </button>

        {/* Additional Skills */}
        <button
          onClick={goToTechStacks}
          type="button"
          aria-label="Navigate to tech stacks section"
          className="hidden relative md:flex justify-center items-center 
          ml-2 cursor-pointer z-10 h-full"
        >
          {techObserver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: easeInOut }}
              className="tab-underline"
            />
          )}
          <div className="relative heading-div">
            <div className="selector z-1" />
            <motion.h2
              initial={{ scale: 1 }}
              animate={techObserver ? { scale: 1.05 } : { scale: 1 }}
              className="flex text-2xl font-medium z-5 navigation-option"
            >
              Tech Stacks
            </motion.h2>
          </div>
        </button>

        {/***************** DROPDOWN MENU *****************/}
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
