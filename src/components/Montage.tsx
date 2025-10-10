import React, { useEffect } from "react";

const clips = [
  {
    id: 1,
    source: "/video/Screenshot 2025-10-07 160608.png",
  },
  {
    id: 2,
    source: "/video/Screenshot 2025-10-07 160631.png",
  },
  {
    id: 3,
    source: "/video/Screenshot 2025-10-07 160641.png",
  },
  {
    id: 4,
    source: "/video/Screenshot 2025-10-07 160702.png",
  },
  {
    id: 5,
    source: "/video/Screenshot 2025-10-07 160714.png",
  },
  {
    id: 6,
    source: "/video/Screenshot 2025-10-07 160721.png",
  },
];

const Montage = () => {
  useEffect(() => {
    let keyframes = "@keyframes piling {\n";

    clips.forEach((clip, i) => {
      const percent = (i / (clips.length - 1)) * 100;
      keyframes += ` ${percent}% { opacity: 1; background-image:url(${clip.source}) }\n`;
    });

    keyframes += "}";

    const style = document.createElement("style");
    style.textContent = keyframes;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div
        style={{ animation: "piling 3s linear infinite" }}
        className="flex montage-frame w-[400px] h-[600px] bg-center bg-cover"
      />
    </div>
  );
};

export default Montage;
