"use client";

import NavigationBar from "~/app/_components/organisms/navigationBar";
import Footer from "~/app/_components/atoms/footer";

import { type NextPage } from "next";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DisplayArea from "~/app/_components/molecules/displayArea";
import { useEffect, useState } from "react";
import useDarkMode from "~/app/hooks/useDarkMode";

dayjs.extend(relativeTime);

const CommunityDisplay: NextPage = () => {
  const topics = [undefined, "Rock:🎸", "Jazz:🎷", "Pop:🫧"];

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      console.log(darkMode);
    }
    console.log(darkMode);
  }, [darkMode]);

  return (
    <>
      <div className={`${dark ? "bg-gray-900" : ""} min-h-screen`}>
        <NavigationBar dark={dark}></NavigationBar>
        <div className={`${dark ? "bg-gray-900" : ""} min-h-screen`}>
          <div
            className={`text-black ${
              dark
                ? "bg-gray-900 text-white"
                : "to-bg-white bg-gradient-to-b from-sp-tp-page"
            } grid-rows-auto grid grid-cols-12 pt-5 font-['Lato']`}
          >
            <div className="col-start-3 col-end-6 row-start-1 row-end-2">
              <h1 className="whitespace-nowrap text-3xl font-bold sm:text-4xl">
                Explore Communities
              </h1>
            </div>
            <DisplayArea dark={dark} topics={topics}></DisplayArea>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default CommunityDisplay;
