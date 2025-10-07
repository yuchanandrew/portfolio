import React, { useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  easeInOut,
  spring,
} from "framer-motion";
import {
  FaDigitalOcean,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa";

const MoreInfo = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  {
    /* Click Function */
  }
  const [current, setCurrent] = useState<null | number>(null);
  const handleClick = (id: number) => {
    setCurrent(id);
    // console.log(`Clicked ${id}!`);
  };

  {
    /* CARDS */
  }
  const cards = [
    {
      id: 1,
      icon: <FaDocker />,
      title: "Docker",
      style: "var(--color-sky-500)",
      divBackground: "var(--color-sky-300)",
      class: "text-white",
      description:
        "Familiar with docker-compose, Dockerfiles, and .dockerignore files. Can dockerize containers effectively and securely, ready for production-ready packages to deploy.",
    },
    {
      id: 2,
      icon: <FaFigma />,
      title: "Figma",
      style:
        "linear-gradient(45deg, var(--color-green-500), var(--color-blue-400), var(--color-purple-400), var(--color-red-400), var(--color-red-500))",
      divBackground:
        "linear-gradient(225deg, var(--color-green-300), var(--color-blue-200), var(--color-purple-200), var(--color-red-200), var(--color-red-200))",
      class: "text-black",
      description:
        "Cleanly design high-fidelity website mockups and designs with great proficiency of Figma tools and assets.",
    },
    {
      id: 3,
      icon: <FaLinux />,
      title: "Linux",
      style: "var(--color-yellow-300)",
      divBackground: "var(--color-yellow-100)",
      class: "text-black",
      description:
        "Mastered Linux commands to deploy Docker containers into production. Proficient at administering user-level permissions and re-assigning root-level access to secured users.",
    },
    {
      id: 4,
      icon: <FaDigitalOcean />,
      title: "Digital Ocean",
      style: "var(--color-blue-600)",
      divBackground: "var(--color-blue-400)",
      class: "text-white",
      description:
        "Effectively deployed projects onto DigitalOcean VPS to significantly cut costs on deployment.",
    },
    {
      id: 5,
      icon: <FaGitAlt />,
      title: "Git",
      style: "var(--color-red-400)",
      divBackground: "var(--color-red-200)",
      class: "text-black",
      description:
        "Utilized Git and Github to organize and keep record of previous project commits and pushes.",
    },
  ];

  {
    /* SEQUENCES */
  }
  const sequences = [
    {
      id: 1,
      type: "text",
      content: "Not impressed yet?",
      class: "text-5xl text-center font-medium",
    },
    {
      id: 2,
      type: "text",
      content: "No worries, I got more to show you 🙂",
      class: "text-3xl text-center text-slate-700 font-medium",
    },
    {
      id: 3,
      type: "cards",
      content: (
        <div className="flex flex-col justify-center items-center w-[80vw] min-h-full">
          <h2
            style={{
              background:
                current !== null
                  ? cards[current - 1].style
                  : "var(--color-emerald-200)",
              color:
                current !== null
                  ? cards[current - 1].divBackground
                  : "var(--color-emerald-700)",
            }}
            className="text-3xl font-semibold py-2 px-4 rounded-xl mb-8"
          >
            Additional Skills
          </h2>
          <div
            id="additional-skills"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-[80vw] justify-center items-center"
          >
            {cards.map((card) => (
              <motion.div
                key={card.id}
                style={{ background: card.style }}
                onClick={() => handleClick(card.id)}
                initial={{ scale: 0 }}
                animate={{ scale: current === card.id ? 1.1 : 1 }}
                transition={{
                  duration: 0.2,
                  type: spring,
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative flex flex-col h-[20vh] rounded-xl shadow-xl overflow-hidden transition-all transform hover:bg-emerald-400 hover:scale-103 hover:rotate-5 ease-in-out"
              >
                <div className="flex justify-end items-start h-full">
                  <div className="flex text-2xl font-medium px-4 py-4">
                    {card.title}
                  </div>
                </div>
                <div
                  className={`absolute opacity-30 text-9xl py-4 px-4 ${card.class}`}
                >
                  {card.icon}
                </div>
              </motion.div>
            ))}
          </div>
          {current && (
            <div
              style={{ background: cards[current - 1].style }}
              className="flex flex-col w-full h-fit mb-100 md:mb-0 mt-4 rounded-xl shadow-xl px-4 py-4 transition-all transform ease-in-out"
            >
              <h2 className="flex text-3xl font-medium mb-4">
                {cards[current - 1].title}
              </h2>
              <p className="flex">{cards[current - 1].description}</p>
            </div>
          )}
        </div>
      ),
      class: "",
    },
  ];

  return (
    <motion.div
      style={{
        background:
          current !== null ? cards[current - 1].divBackground : undefined,
      }}
      transition={{ duration: 2, ease: easeInOut }}
      className="min-h-[600vh] flex flex-col"
    >
      <div ref={ref} className="relative min-h-[600vh] flex">
        <div className="sticky top-150 md:top-20, lg:top-30 h-screen flex flex-col justify-center items-center w-full">
          {sequences.map((sequence, i) => {
            const start = (i + 1) / (sequences.length + 1);
            const end = (i + 1) / sequences.length;
            const y = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [0, -25, -50, -200]
            );
            const opacity = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [0, 1, 0, 0]
            );
            const opacity_solid = useTransform(
              scrollYProgress,
              [start - 0.1, start, end, end + 0.1],
              [0, 1, 1, 1]
            );

            return (
              <motion.div
                key={sequence.id}
                style={
                  sequence.id !== 3
                    ? { y, opacity }
                    : { y, opacity: opacity_solid }
                }
                initial="hidden"
                className={`${sequence.class}`}
              >
                {sequence.content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default MoreInfo;
