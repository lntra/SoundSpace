"use client";

import { usePathname } from "next/navigation";

import DropdownMin from "~/app/_components/atoms/dropdownMin";
import { api } from "~/trpc/react";
import { type Following } from "~/lib/definitions";
import Link from "next/link";
import useSessionData from "~/app/hooks/useSessionData";
import { useEffect, useState } from "react";
import { type UUID } from "crypto";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import NavigationBar from "~/app/_components/organisms/navigationBar";
import useDarkMode from "~/app/hooks/useDarkMode";

interface User {
  id: UUID;
  email?: string;
  name: string;
  url_icon: string;
  url_banner: string;
  description: string;
}

const getFollowedUsers = (): User[] => {
  const storedFollowedUsers = localStorage.getItem("followedUsers");
  return storedFollowedUsers ? JSON.parse(storedFollowedUsers) : [];
};

const Follows = () => {
  const pathname = usePathname();

  const name = pathname.split("/")[3] || "";

  const { data, isLoading, error } = api.user.getUserFollowing.useInfiniteQuery(
    { userId: name },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: name !== "",
    },
  );

  const { data: session } = useSessionData();

  const [sessionId, setSessionId] = useState("");

  const [followedUsers, setFollowedUsers] = useState<User[]>(() =>
    getFollowedUsers(),
  );

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      }
  }, [darkMode]);

  useEffect(() => {
    if (session?.user.id) {
      const sessionIDvalue = session.user.id as string;
      setSessionId(sessionIDvalue);

      if (sessionIDvalue !== name) {
        console.log("sendo deletado");
        setFollowedUsers([]);
      }
    }
  }, [session, name]);

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
              {followedUsers &&
                followedUsers.length > 0 &&
                followedUsers.map((user, index) => (
                  <div className="" key={index}>
                    <Link key={user.id} href={`/pages/profile/${user.id}`}>
                      <div className="h-fit p-2">
                        <div className="col-span-4 row-span-1 rounded-3xl border border-sp-purpleBright2 bg-white p-4">
                          <div className="flex flex-col">
                            <div className="flex flex-grow flex-row flex-nowrap justify-between">
                              <div className="line-clamp-2 flex items-center  gap-2 overflow-x-hidden">
                                <img
                                  className="h-12 w-12 rounded-3xl object-cover"
                                  src={`${
                                    user.url_icon !== null
                                      ? user.url_icon
                                      : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"
                                  }`}
                                  alt="userIcon"
                                />
                                <div className="flex flex-col">
                                  <h3 className="line-clamp-2 text-xl font-bold">{`${user.name}`}</h3>
                                  <p className=" line-clamp-2 overflow-x-hidden text-base">{`${user.description}`}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              {data?.pages.map((page, index) => (
                <div key={index}>
                  {page.allPosts.map((follow: Following) => (
                    <Link
                      key={follow.following_id}
                      href={`/pages/profile/${follow.following_id}`}
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
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default Follows;

/*
{data && data?.pages[0]?.allPosts.length == 0 && (
                        <div className="h-[60vh] col-start-2 col-end-12 mt-4 row-start-2">
                            <NoResults dark={true}></NoResults>
                        </div>
                    )}
*/
