"use client";

import { usePathname } from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DropdownMin from "~/app/_components/atoms/dropdownMin";
import { api } from "~/trpc/react";
import { type Followers } from "~/lib/definitions";
import Link from "next/link";
import NoResults from "~/app/_components/atoms/noResults";
import useSessionData from "~/app/hooks/useSessionData";
import { useEffect, useState } from "react";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import useDarkMode from "~/app/hooks/useDarkMode";
import NavigationBar from "~/app/_components/organisms/navigationBar";

dayjs.extend(relativeTime);

const Follows = () => {
  const pathname = usePathname();

  const name = pathname.split("/")[3] || "";

  const { data, isLoading, error } = api.user.getUserFollowed.useInfiniteQuery(
    { userId: name },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: name !== "",
    },
  );

  const { data: session } = useSessionData();

  const [sessionId, setSessionId] = useState("");

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      }
  }, [darkMode]);

  useEffect(() => {
    setSessionId(session?.user.id as string);
  }, [session]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.01]">
        <LoadingPage></LoadingPage>
      </div>
    );
  }

  return (
    <>
      <div className="block lg:hidden">
        <NavigationBar dark={dark}></NavigationBar>
      </div>
      <span className="header-background grid h-[100%] min-h-screen w-[100%] grid-cols-pr bg-sp-purple">
        <div className="fixed left-0 hidden h-[100%] w-[100%] min-w-[90px] max-w-[90px] bg-sp-purple pr-[1px] md:col-span-1 lg:block">
          <DropdownMin link={sessionId}></DropdownMin>
        </div>
        <div className="col-start-1 col-end-13 h-[100%] w-[100%] font-[Lato] lg:col-start-2">
          <div className="grid-rows-auto grid w-[100%] grid-cols-10">
            <div className="col-start-2 col-end-10 mt-4 min-h-[71vh] w-[100%] lg:col-start-3 lg:col-end-9 3xl:col-start-4 3xl:col-end-8">
              {data?.pages.map((page, index) => (
                <div key={index}>
                  {page.allPosts.map((follow: Followers) => (
                    <Link
                      key={follow.follower_id}
                      href={`/pages/profile/${follow.follower_id}`}
                    >
                      <div className="h-full p-2">
                        <div className="col-span-4 row-span-1 rounded-3xl border border-sp-purpleBright2 bg-white p-4">
                          <div className="flex flex-col">
                            <div className="flex flex-grow flex-row flex-nowrap justify-between">
                              <div className="line-clamp-2 flex items-center  gap-2 overflow-x-hidden">
                                <img
                                  className="h-12 w-12 rounded-3xl object-cover"
                                  src={`${
                                    follow.user_icon !== null
                                      ? follow.user_icon
                                      : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"
                                  }`}
                                  alt=""
                                />
                                <div className="flex flex-col">
                                  <h3 className="line-clamp-2 text-xl font-bold">{`${follow.user_name}`}</h3>
                                  <p className=" line-clamp-2 overflow-x-hidden text-base">{`${follow.user_description}`}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
              {data && data?.pages[0]?.allPosts.length == 0 && (
                <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                  <NoResults dark={true}></NoResults>
                </div>
              )}
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default Follows;
