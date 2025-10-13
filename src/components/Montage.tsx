import React, { useEffect, useState } from "react";

type clip = {
  id: number;
  source: string;
};

interface MontageProps {
  clips: clip[];
}

const Montage = ({ clips }: MontageProps) => {
  const [end, setEnd] = useState(0);

  useEffect(() => {
    if (end < clips.length) {
      // Check if end is less than the length of clips
      const timer = setTimeout(() => setEnd((prev) => prev + 1), 150); // Iterate through each
      return () => clearTimeout(timer);
    } else if (end === clips.length) {
      setEnd(1);
    }
  }, [clips.length, end]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-1/2 py-20 bg-amber-200">
        {clips.slice(0, end).map((clip) => (
          <img
            key={clip.id}
            src={clip.source}
            alt={`Clip number ${clip.id + 1} in montage`}
            className={
              end % 5 === 1
                ? "w-1/4 absolute object-cover aspect-square rotate-5"
                : end % 5 === 3
                ? "w-1/4 absolute object-cover aspect-square rotate-355"
                : "w-1/4 absolute object-cover aspect-square"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Montage;
