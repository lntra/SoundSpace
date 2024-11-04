"use client";

import { useEffect, useState } from "react";
import Footer from "../../_components/atoms/footer";
import CommunityPostsSection from "../../_components/organisms/communityPosts";
import NavigationBar from "../../_components/organisms/navigationBar";
import useDarkMode from "~/app/hooks/useDarkMode";

const CommunityPage = () => {
  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);
    }
  }, [darkMode]);

  return (
    <>
      <main className="text-white">
        <div className="lato-font">
          <NavigationBar dark={dark}></NavigationBar>
          <div
            className={`${
              dark
                ? "bg-gray-900 bg-gradient-to-b text-white"
                : "bg-sp-tp-page text-black"
            }`}
          >
            <CommunityPostsSection dark={dark} type="home" />
            <Footer></Footer>
          </div>
        </div>
      </main>
    </>
  );
};

export default CommunityPage;
