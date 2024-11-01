"use client";

import { useEffect, useState } from "react";
import BarComponents from "../molecules/barIcons";
import Link from "next/link";
import LoadingPage from "./loadingPage";
import { type UUID } from "crypto";
import { useRouter } from "next/navigation";
import useSessionData from "~/app/hooks/useSessionData";

interface NavigationBarProps {
  dark: boolean;
}

const NavigationBar = ({ dark }: NavigationBarProps) => {
  const router = useRouter();

  const [text, setText] = useState("");

  const [nav, setNav] = useState(false);

  const handleTextChange = (event: boolean) => {
    setNav(event);
  };

  useEffect(() => {
    const handleScroll = () => {
      setNav(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { data, isLoading } = useSessionData();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.01]">
        <LoadingPage></LoadingPage>
      </div>
    );
  }

  const name = data?.user.name as string;
  const image = data?.user.url_icon as string;
  const uuid = data?.user.id as UUID;

  return (
    <>
      <span className="h-24 w-[100%]">
        {data && (
          <>
            <BarComponents
              dark={dark}
              id={uuid}
              name={name}
              image={image}
              change={handleTextChange}
              value={text}
              text={setText}
            ></BarComponents>
            <div
              className={`top-20 line-clamp-1 grid grid-cols-12 truncate px-4 pb-4 text-black
                            ${
                              nav
                                ? `fixed right-[8.5%] h-[25vh] w-[82.5vw] ${
                                    dark
                                      ? "bg-gray-950 text-white"
                                      : "bg-white text-black"
                                  } z-50 duration-300`
                                : `fixed right-[8.5%] top-[-100%] h-[25vh] w-[82.5vw] ${
                                    dark
                                      ? "bg-gray-950 text-white"
                                      : "bg-white text-black"
                                  }  z-50 duration-300`
                            }
                        `}
            >
              <div className="col-start-2 col-end-12 line-clamp-1 flex w-full flex-col items-center justify-center truncate">
                <Link
                  href={`/pages/community/display/search/${text}`}
                  className={`w-full border-b border-b-sp-purpleBright2 p-4 font-[Lato] ${
                    dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  } `}
                >
                  <h1 className="text-xl">Search {text} in Communities</h1>
                </Link>
                <Link
                  href={`/pages/home/news/search/${text}`}
                  className={`w-full border-b border-b-sp-purpleBright2 p-4 font-[Lato] ${
                    dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  } `}
                >
                  <h1 className="text-xl">Search {text} in News</h1>
                </Link>
                <Link
                  href={`/pages/community/search/${text}`}
                  className={`w-full border-b border-b-sp-purpleBright2 p-4 font-[Lato] ${
                    dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  } `}
                >
                  <h1 className="text-xl">Search {text} in Posts</h1>
                </Link>
              </div>
            </div>
          </>
        )}
      </span>
    </>
  );
};

export default NavigationBar;
