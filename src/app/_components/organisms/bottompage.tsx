"use client";

import Footer from "../atoms/footer";
import Trending from "../atoms/trending";
import BottomNews from "../molecules/bottomNews";
import PlaceholderProps from "../molecules/placeholderProps";
import UserPost from "../molecules/UserPost";
import Highlights from "../atoms/highlight";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import LoadingPage from "./loadingPage";
import Link from "next/link";

interface NewsAsProps {
  disabledIds: Set<`${string}-${string}-${string}-${string}-${string}`>;
  dark: boolean;
}

const BottomPage = ({ disabledIds, dark }: NewsAsProps) => {
  const [search, setSearch] = useState("Trending");

  const trendingRoute = api.home.getNewsbyTrending.useInfiniteQuery(
    { cursor: undefined },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === "Trending",
    },
  );

  const recentRoute = api.home.getNewsbyRecent.useInfiniteQuery(
    { cursor: undefined },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === "Recent",
    },
  );

  const articlesRoute = api.home.getNewsbyArticles.useInfiniteQuery(
    { cursor: undefined },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === "Articles",
    },
  );

  const newsRoute = api.home.getNewsbyNews.useInfiniteQuery(
    { cursor: undefined },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === "News",
    },
  );

  const getCurrentQuery = () => {
    switch (search) {
      case "Trending":
        return trendingRoute;
      case "Recent":
        return recentRoute;
      case "Articles":
        return articlesRoute;
      case "News":
        return newsRoute;
      default:
        return {
          data: null,
          isLoading: false,
          error: null,
          fetchNextPage: () => {},
          hasNextPage: false,
          isFetchingNextPage: false,
        };
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getCurrentQuery();

  const handleFetchMore = () => {
    console.log(hasNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      console.log("oi2");
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("oi");
        handleFetchMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div
        className={`${
          dark ? "bg-gray-900 text-white" : "bg-white text-black"
        } overflow-x-hidden`}
      >
        <div className="m-6 flex flex-wrap items-center justify-center">
          <Trending
            dark={dark}
            search={search}
            setSearch={setSearch}
            topics={["Trending", "Articles", "News", "Recent"]}
          ></Trending>
        </div>
        <div
          className={`grid-rows-auto grid w-full grid-cols-12 gap-2 overflow-x-hidden`}
        >
          {data && (
            <BottomNews
              dark={dark}
              disabledIds={disabledIds}
              news={data}
            ></BottomNews>
          )}
          {isLoading && (
            <div className="col-span-9 col-start-2 col-end-9 row-start-1">
              <LoadingPage></LoadingPage>
            </div>
          )}
          <div
            className={`hidden h-[350px] p-3 lg:col-span-4 lg:row-span-3 lg:row-start-1 lg:block xl:col-span-3 ${
              dark ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <PlaceholderProps
              dark={dark}
              className={` ${
                dark ? "bg-gray-950 text-white" : "bg-white text-black"
              }`}
              title="Trending Communities"
            >
              <div className="flex  flex-col p-3">
                <Link
                  href={`/pages/community/${"97f4d418-eb4a-425d-97d0-83f6acbc435a"}`}
                >
                  <div
                    className={` ${
                      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    } flex items-center border-b-[1px] border-sp-purpleBright2 py-2 align-middle`}
                  >
                    <UserPost
                      dark={dark}
                      img={`https://fastly.picsum.photos/id/446/3072/1728.jpg?hmac=62VykY0FNeXxvrUhPIGiucHvYI1qd_VzMTmk98U-D5Y`}
                      textStyle="text-base"
                      style="w-8 h-8 mr-2 rounded-full"
                      text="The Band, from Outer Space"
                      userId={"97f4d418-eb4a-425d-97d0-83f6acbc435a"}
                    ></UserPost>
                    <Highlights text="HOT"></Highlights>
                  </div>
                </Link>
                <Link
                  href={`/pages/community/${"3edb55a2-a037-48a7-81af-d19c99b00dc1"}`}
                >
                  <div
                    className={` ${
                      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    } flex items-center border-b-[1px] border-sp-purpleBright2 py-2 align-middle`}
                  >
                    <UserPost
                      dark={dark}
                      img={`https://fastly.picsum.photos/id/548/5000/3333.jpg?hmac=BdycqoDMwkZoSovCL9E2F8MAyqdhkHVj8yYkHvkkkVM`}
                      textStyle="text-base"
                      style="w-8 h-8 mr-2 rounded-full"
                      text="SunDown"
                      userId={"3edb55a2-a037-48a7-81af-d19c99b00dc1"}
                    ></UserPost>
                    <Highlights text="HOT"></Highlights>
                  </div>
                </Link>
                <Link
                  href={`/pages/community/${"0a8d5e32-1e4f-4a9a-9f5d-1c1234567890"}`}
                >
                  <div
                    className={` ${
                      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    } flex items-center border-b-[1px] border-sp-purpleBright2 py-2 align-middle`}
                  >
                    <UserPost
                      dark={dark}
                      img={`https://fastly.picsum.photos/id/672/5000/3333.jpg?hmac=u6anJjrup8TAGrJxZSY3u-9OmftJ1Dn4P_6vPqF7a7U`}
                      textStyle="text-base"
                      style="w-8 h-8 mr-2 rounded-full"
                      text="Indie Harmony"
                      userId={"0a8d5e32-1e4f-4a9a-9f5d-1c1234567890"}
                    ></UserPost>
                  </div>
                </Link>
                <Link
                  href={`/pages/community/${"1b9e3c45-2d5a-4e6b-bc5a-2d1234567890"}`}
                >
                  <div
                    className={` ${
                      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    } flex items-center border-b-[1px] border-sp-purpleBright2 py-2 align-middle`}
                  >
                    <UserPost
                      dark={dark}
                      img={`https://fastly.picsum.photos/id/815/2074/1383.jpg?hmac=z5kVymrNUTKCDBhKG3oays-sesL-_APZSoaWQJInU4s`}
                      textStyle="text-base"
                      style="w-8 h-8 mr-2 rounded-full"
                      text="Pop Vibes"
                      userId={"1b9e3c45-2d5a-4e6b-bc5a-2d1234567890"}
                    ></UserPost>
                  </div>
                </Link>
                <Link
                  href={`/pages/community/${"2c0f4e56-3e7b-4f8b-cd6a-3e1234567890"}`}
                >
                  <div
                    className={` ${
                      dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                    } flex items-center py-2 align-middle`}
                  >
                    <UserPost
                      dark={dark}
                      img={`https://fastly.picsum.photos/id/755/5000/3800.jpg?hmac=kHxjzz3TQ4ZQLtUF3fNgIiBMwHc04Kf9xg9jfYsabxM`}
                      textStyle="text-base"
                      style="w-8 h-8 mr-2 rounded-full"
                      text="Jazz Lounge"
                      userId={"2c0f4e56-3e7b-4f8b-cd6a-3e1234567890"}
                    ></UserPost>
                  </div>
                </Link>
              </div>
            </PlaceholderProps>
          </div>
        </div>
      </div>
      <Footer></Footer>
      {isFetchingNextPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoadingPage></LoadingPage>
        </div>
      )}
    </>
  );
};

export default BottomPage;
