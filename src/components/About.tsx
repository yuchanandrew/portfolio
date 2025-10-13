import React, { useEffect, useState } from "react";
import Song from "./Song";
import axios from "axios";
import FileDownload from "./FileDownload";

const About = () => {
  const [track, setTrack] = useState("");

  const fetchSong = async () => {
    const response = await axios.get(
      "https://api.andrewrho.dev/get-currently-playing"
    );

    const url = await response.data.spotify;

    console.log("Data:", url);

    // TEXT TO ADD TO MAKE INTO EMBED
    const text1 = "/embed";
    const text2 = "?utm_source=generator";

    const embedURL =
      url.slice(0, 24) + text1 + url.slice(24, url.length) + text2;

    console.log("Final URL:", embedURL);

    setTrack(embedURL);
  };

  useEffect(() => {
    // COMMENT: current implementation of auto-polling for Spotify current listen refresh

    if (track === "") {
      fetchSong();
    }
    const spotify_refresh = setInterval(fetchSong, 5000);

    return () => clearInterval(spotify_refresh);
  }, []);
  return (
    <div className="relative flex justify-center items-center w-full min-h-screen mt-12 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full px-8 gap-8 auto-rows-min [grid-auto-flow:dense]">
        {/* #1 Who am I? */}
        <div className="flex flex-col col-span-2 w-full md:col-span-1 justify-start items-start bg-emerald-700 px-2 py-4 rounded-xl border-r-8 border-b-10 border-emerald-900">
          <h2 className="text-3xl font-semibold text-center w-full text-emerald-200 mb-8">
            Who am I?
          </h2>
          <p className="text-emerald-200">
            I am a 4th year student attending the University of Colorado at
            Boulder. I am studying computer science with a passion for web
            development and software development. I have always been a builder
            and love seeing projects being built and completed right in front of
            my eyes!
          </p>
        </div>

        {/* #2 What are my interests? */}
        <div className="flex flex-col col-span-2 md:col-span-1 w-full justify-start items-start bg-emerald-700 px-2 py-4 rounded-xl border-r-8 border-b-10 border-emerald-900">
          <h2 className="text-3xl font-semibold text-center w-full text-emerald-200 mb-8">
            What are my interests?
          </h2>
          <p className="text-emerald-200">
            In my free time, I love skating, thrifting, and listening to music.
            I listen to music all the time, so it's quite possible that I'm
            listening right now. Check out the song that I'm listening to right
            now and scrolling along 🙂‍↕️
          </p>
        </div>

        {/* #3 Favorite Song */}
        <div className="flex flex-col col-span-2 justify-center items-center">
          <div className="flex justify-center items-center mb-8 w-full bg-emerald-700 rounded-xl px-2 py-2 border-r-8 border-b-10 border-emerald-900">
            <h2 className="flex justify-center text-3xl font-medium text-emerald-200">
              The song I'm listening to right now 🎶
            </h2>
          </div>
          <Song source={track} />
        </div>

        {/* #4 My passions */}
        <div className="flex flex-col col-span-2 md:col-span-1 lg:col-span-2 justify-start items-start bg-emerald-700 px-2 py-4 rounded-xl border-r-8 border-b-10 border-emerald-900">
          <h2 className="text-3xl font-semibold text-center w-full text-emerald-200 mb-8">
            Why do I love web dev?
          </h2>
          <p className="text-emerald-200">
            I really enjoy investing time into building something, such as a
            project. Being able to see my hard work and dedication turn into
            something much bigger and complex is such a rewarding feeling. I
            also learn so much from actually building compared to learning in
            classes.
          </p>
        </div>

        {/* #5 Download My Resume! */}
        <div className="flex flex-col col-span-2 md:col-span-1 lg:col-span-2 justify-start items-start bg-emerald-700 px-2 py-4 rounded-xl border-r-8 border-b-10 border-emerald-900">
          <h2 className="text-3xl font-semibold text-center w-full text-emerald-200 mb-8">
            Download my resume!
          </h2>
          <div className="flex flex-col lg:flex-row gap-5 w-full justify-center items-center">
            <p className="text-emerald-200 w-full lg:w-1/2 text-center md:text-left">
              I get it, I get it! You're here for my resume... here it is!
            </p>
            <div className="flex w-3/4 lg:w-1/2 justify-center items-center">
              <FileDownload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
