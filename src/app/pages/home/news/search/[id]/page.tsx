"use client";

import NavigationBar from "~/app/_components/organisms/navigationBar";
import Footer from "~/app/_components/atoms/footer";

import { type NextPage } from "next";
import { usePathname } from "next/navigation";
import RejectedPage from "~/app/_components/organisms/rejectedPage";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import { api } from "~/trpc/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { type News } from "~/lib/definitions";
import NoResults from "~/app/_components/atoms/noResults";
import { useEffect, useState } from "react";
import useDarkMode from "~/app/hooks/useDarkMode";
import TextNews from "~/app/_components/atoms/textnews";
import Tagsnews from "~/app/_components/atoms/tagsnews";
import Link from "next/link";

dayjs.extend(relativeTime);

const CommunityDisplayQuery: NextPage = () => {
  const pathname = usePathname();

  const name = pathname.split("/").pop() || "";

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      }
  }, [darkMode]);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.home.getAllNewsbyQuery.useInfiniteQuery(
    { search: name },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const handleFetchMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        handleFetchMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="h-[100vh]">
        <LoadingPage></LoadingPage>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
        <RejectedPage></RejectedPage>
      </div>
    );
  }

  return (
    <>
      <NavigationBar dark={dark}></NavigationBar>
      <div
        className={`font-[Lato] ${
          dark ? "bg-gray-900 text-white" : "bg-white text-black"
        } `}
      >
        <div
          className={`grid-rows-auto grid w-[100%] grid-cols-12 font-[Lato] ${
            dark ? "bg-gray-900 text-white" : "bg-white text-black"
          } `}
        >
          <div className="md: col-start-1 col-end-13 mt-4 min-h-[71vh] w-[100%] lg:col-start-2 lg:col-end-12 xl:col-start-3 xl:col-end-11 3xl:col-start-4 3xl:col-end-10">
            <div>
              {data?.pages.map((page, index) => (
                <div key={index}>
                  <div key={index} className="m-4  text-white">
                    <div
                      className={`col-span-9 col-start-2 col-end-9 row-start-${
                        index + 1
                      }`}
                      key={index}
                    >
                      {page.allNews.map((newsItem: News, index: number) => (
                        <div key={newsItem.id}>
                          <Link
                            prefetch={true}
                            href={`/pages/home/news/${newsItem.id}`}
                            className={`pt-4`}
                            key={newsItem.id}
                          >
                            <div
                              className={`${
                                index === 0 ? `` : `pt-5`
                              } col-span-7 row-start-${index + 1} row-end-${
                                index + 2
                              } grid grid-cols-7 grid-rows-2 gap-5 border-b-[1px] border-solid border-sp-purpleBright2 pb-5`}
                            >
                              <img
                                className="col-span-3 row-span-2 h-full max-h-[255px] min-h-[255px] w-full rounded-3xl border-gray-200 object-cover"
                                src={newsItem.url}
                                alt="Imagem Notícia"
                              />
                              <div className="col-span-4 row-span-2 flex flex-wrap content-center items-center justify-start border-gray-200 p-5">
                                <Tagsnews
                                  userName={undefined}
                                  dark={dark}
                                  time={newsItem.created_at}
                                  tag={newsItem.tag}
                                  userId={newsItem.user_id}
                                />
                                <TextNews
                                  dark={dark}
                                  title={newsItem.title}
                                  content={newsItem.content}
                                />
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {data.pages[0]?.allNews[0] === undefined && (
              <div className="h-full">
                <NoResults dark={dark ? true : false}></NoResults>
              </div>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default CommunityDisplayQuery;
