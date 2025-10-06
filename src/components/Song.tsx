interface SongProps {
  source: string;
}

const Song = ({ source }: SongProps) => {
  return (
    <div className="rounded-xl overflow-hidden w-full h-[352px]">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "var(rounded-xl)" }}
        src={source}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="border-0"
      ></iframe>
    </div>
  );
};

export default Song;
