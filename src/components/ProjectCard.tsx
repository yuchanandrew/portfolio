import React from "react";

interface ProjectCardProp {
  title: string; // Of type string
  description: string; // Of type string
  skills: string[]; // Of type string array
  bgstyle: string;
  skillbg: string;
}

const ProjectCard = ({
  title,
  description,
  skills,
  bgstyle,
  skillbg,
}: ProjectCardProp) => {
  return (
    <div
      style={{ background: bgstyle }}
      className="absolute flex flex-col justify-start items-start rounded-xl px-4 py-2 w-full shadow-xl"
    >
      <h2 className="flex text-4xl font-semibold mb-4">{title}</h2>
      <p className="flex mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            style={{ background: skillbg }}
            className="flex px-2 py-1 rounded-full text-sm bg-white"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
