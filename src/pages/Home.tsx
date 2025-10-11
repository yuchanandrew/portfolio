import { useState } from "react";
import CardStack from "../components/CardStack";
import Profile from "../components/Profile";
import MoreInfo from "../components/MoreInfo";
import About from "../components/About";

const Home = () => {
  const [showNext, setShowNext] = useState(false);

  if (!showNext) {
    return (
      <div className="flex h-[calc(100vh-6.75rem)] overflow-y-hidden justify-center items-center">
        <div className="flex min-h-screen justify-center items-center">
          <div
            className="flex photo-wrapper justify-center items-center"
            onAnimationEnd={(e) => {
              if (e.animationName === "implode") {
                setShowNext(true);
              }
            }}
          >
            <img
              src="/headshot.JPG"
              alt="Andrew Rho"
              className="flex about-photo justify-self-center"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-6">
        <Profile />

        {/* About Section */}
        <section id="about" className="flex flex-col w-full">
          <div className="relative h-[50vh] flex w-full">
            <div className="absolute inset-0 flex">
              <div className="hidden md:flex w-1/3">
                <h2 className="flex text-5xl font-semibold justify-center items-center w-full">
                  About Me
                </h2>
              </div>
              <div className="flex flex-col w-full md:w-2/3 z-5">
                <div className="flex transition-rect justify-center items-center">
                  <div className="flex md:hidden text-emerald-200 md:text-black text-5xl font-semibold rotate-350">
                    About Me
                  </div>
                </div>
                <div className="reverse-triangle" />
              </div>
            </div>
          </div>

          <div className="flex">
            <About />
          </div>
        </section>

        {/* Projects Section */}
        <div
          id="skills"
          // style={{
          //   background:
          //     "linear-gradient(45deg, var(--color-emerald-400), var(--color-emerald-200))",
          // }}
          className="flex flex-col w-full"
        >
          <CardStack />
        </div>

        {/* Additional Skills Section */}
        <div className="w-full">
          <MoreInfo />
        </div>

        {/* Projects Section */}
      </div>
    </div>
  );
};

export default Home;
