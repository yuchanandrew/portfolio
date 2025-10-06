import { FaReact, FaNode } from "react-icons/fa";
import { SiMysql, SiHuggingface } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

import { useScroll, useTransform, motion, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

type card = {
  id: number;
  icon: any;
  background: string;
  title: string;
  description: string;
  skills: string[];
  bgstyle: string;
};

const cards = [
  {
    id: 1,
    icon: <FaReact size={150} />,
    background:
      "linear-gradient(45deg, var(--color-blue-600), var(--color-blue-200))",
    title: "emjournal.dev",
    description:
      "My own personal journal turned emotion-sharing social media platform. CSS was expertly used for the first time to develop subtle animations and more detailed designs. Database architecture was engineered by thoughtfully deciding the relational connections between tables and different attributes. Developed a site-wide authentication by creating a secure communication between React's useContext and backend user verification.",
    skills: [
      "ReactJS",
      "Node",
      "MySQL",
      "CSS",
      "Python",
      "HuggingFace",
      "TailwindCSS",
      "Docker",
      "NGINX",
      "Traefik",
      "DigitalOcean",
      "Cloudflare",
    ],
    bgstyle:
      "linear-gradient(45deg, var(--color-orange-300), var(--color-yellow-200))",
    overallbg:
      "linear-gradient(45deg, var(--color-orange-600), var(--color-yellow-400))",
  },
  {
    id: 2,
    icon: <FaNode size={150} />,
    background:
      "linear-gradient(45deg, var(--color-emerald-600), var(--color-emerald-200))",
    title: "Prk-n-Pik Storefront",
    description:
      "Created a custom storefront for a business, which communicated directly to the Clover Point-of-Sale system to ensure ACID-certified transactions. Data that wasn't a part of the data architecture in Clover POS was included in a separate MySQL database, such as images, descriptions, and inventory count.",
    skills: ["ReactJS", "Node", "Express", "MySQL", "Clover", "TailwindCSS"],
    bgstyle:
      "linear-gradient(45deg, var(--color-red-400), var(--color-rose-200))",
    overallbg:
      "linear-gradient(45deg, var(--color-red-600), var(--color-rose-400))",
  },
  {
    id: 3,
    icon: <SiMysql size={150} />,
    background:
      "linear-gradient(45deg, var(--color-indigo-600), var(--color-indigo-200))",
    title: "Graphic Violence",
    description:
      "Utilized ReactJS to create a clean user interface and was the first exposure to single page application rendering. I utilized JSON Web Tokens (JWT) to store user cookies and develop a session-based cart system, which seamlessly transitioned into the Stripe API.",
    skills: ["ReactJS", "Node", "Express", "Stripe", "TailwindCSS"],
    bgstyle:
      "linear-gradient(45deg, var(--color-blue-400), var(--color-green-200))",
    overallbg:
      "linear-gradient(45deg, var(--color-blue-600), var(--color-green-400))",
  },
  // {
  //   id: 4,
  //   icon: <RiTailwindCssFill size={150} />,
  //   background:
  //     "linear-gradient(45deg, var(--color-sky-600), var(--color-sky-200))",
  //   title: "TailwindCSS",
  //   description: "This is tailwindcss.",
  //   skills: ["Hello"],
  //   bgstyle: "var(--color-gray-300)",
  //   overallbg: "var(--color-gray-500)",
  // },
  // {
  //   id: 5,
  //   icon: <SiHuggingface size={150} />,
  //   background:
  //     "linear-gradient(45deg, var(--color-yellow-600), var(--color-orange-200))",
  //   title: "HuggingFace",
  //   description: "This is huggingface.",
  //   skills: ["Hello"],
  //   bgstyle: "var(--color-gray-300)",
  //   overallbg: "var(--color-gray-500)",
  // },
];

const CardStack = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;

    let timeout: number | null = null;

    const handleScroll = () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = window.setTimeout(() => {
        const cardHeight = current.clientHeight;
        const index = Math.round(current.scrollTop / cardHeight);

        current.scrollTo({
          top: index * cardHeight,
          behavior: "smooth",
        });
      }, 80);
    };

    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle background color changing:
  const [index, setIndex] = useState<null | number>(null);

  // useEffect(() => {
  //   const handleIndexChange = (i: number) => {
  //     setIndex(i);
  //   };
  // }, [index]);

  return (
    // Overall Div
    <div
      style={{
        background: index !== null ? cards[index].overallbg : undefined,
      }}
      ref={ref}
      className="relative min-h-[200vh] flex flex-col"
    >
      <div className="relative min-h-[500vh] flex">
        <div className="absolute inset-0 w-full flex">
          <h2 className="flex sticky top-40 w-full px-12 h-screen text-5xl font-semibold justify-end items-start">
            Projects
          </h2>
        </div>
        {/* Scrollable Div */}
        <div className="sticky top-20 h-screen w-1/3 flex justify-center items-center z-30 mt-20">
          {cards
            .slice()
            .reverse()
            .map((card, i) => {
              const reverse_i = cards.length - i - 1;
              const start = reverse_i / cards.length;
              const end = (reverse_i + 1) / cards.length;

              useEffect(() => {
                const change = scrollYProgress.on("change", (latest) => {
                  const index = Math.min(
                    cards.length - 1,
                    Math.floor(latest * cards.length)
                  );

                  if (latest === 0) {
                    setIndex(null);
                    return;
                  }

                  setIndex(index);
                });

                return () => change();
              }, [scrollYProgress]);

              const x = useTransform(
                scrollYProgress,
                [start, start, end, end + 0.1],
                [0, -25, -50, -100]
              );
              const y = useTransform(
                scrollYProgress,
                [start, start, end, end + 0.1],
                [0, -25, -50, -100]
              );
              const scale = useTransform(
                scrollYProgress,
                [start - 0.1, start, end, end + 0.1],
                [1, 0.8, 1, 1]
              );
              const rotate = useTransform(
                scrollYProgress,
                [start, end],
                [0, 5]
              );
              const opacity = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end, end + 0.1],
                [0, 0, 1, 0, 0]
              );
              return (
                <motion.div
                  key={card.id}
                  style={{
                    background: card.bgstyle,
                    x,
                    y,
                    opacity,
                    top: `calc(${i * 20 + 80}px)`,
                    left: `calc(25% + ${i * 20}px)`,
                    zIndex: cards.length - 1,
                  }}
                  className="flex absolute w-[300px] h-[400px] rounded-2xl shadow-xl flex-col items-center justify-center"
                >
                  <div className="flex">{card.icon}</div>
                  {/* <div className="flex text-xl md:text-3xl">{card.title}</div> */}
                </motion.div>
              );
            })}
        </div>

        {/* Right-side descriptions */}
        <div className="sticky top-0 w-2/3 h-screen flex flex-col justify-center items-center">
          <div className="flex w-full frame"></div>
          {cards
            .slice()
            .reverse()
            .map((card, i) => {
              const reverse_i = cards.length - i - 1;
              const start = reverse_i / cards.length;
              const end = (reverse_i + 1) / cards.length;
              // const y = useTransform(
              //   scrollYProgress,
              //   [reverse_i * 0.1, reverse_i * 0.1 + 0.03, (reverse_i + 1) * 0.1],
              //   [0, -1000]
              // );

              const opacity_right = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end, end + 0.1],
                [0, 0, 1, 0, 0]
              );

              return (
                <motion.div
                  key={card.id}
                  style={{
                    opacity: opacity_right,
                    background: card.background,
                  }}
                  initial="hidden"
                  whileInView="visible"
                  className="flex absolute flex-col w-2/3 mt-[6.75rem] justify-center items-start rounded-xl px-4"
                >
                  {/* <h2 className="flex text-5xl font-semibold mt-4">
                    {card.title}
                  </h2>
                  <div className="flex mt-8 mb-4">{card.description}</div> */}
                  <ProjectCard
                    title={card.title}
                    description={card.description}
                    skills={card.skills}
                    bgstyle={card.bgstyle}
                  />
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
