import React, { useEffect, useState } from "react";

const Typing = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("Software Developer");

  const phrases = ["Software Developer", "Web Designer", "Network DevOps"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % phrases.length;
        setText(phrases[nextIndex]);

        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex type-frame justify-start items-center">
        <div
          style={{ "--ch": text.length } as any}
          className="flex text-box typing"
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default Typing;
