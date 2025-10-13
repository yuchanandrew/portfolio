import Montage from "../components/Montage";

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

const Test = () => {
  return <Montage clips={clips} />;
};

export default Test;
