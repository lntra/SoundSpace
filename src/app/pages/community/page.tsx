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

            <CommunityPostsSection dark={dark} type="home" />

    </>
  );
};

export default CommunityPage;
