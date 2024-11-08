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
import { type UUID } from "crypto";
import CardsDisplay from "~/app/_components/molecules/cardsDisplay";

import { type Communities } from "~/lib/definitions";
import NoResults from "~/app/_components/atoms/noResults";
import useDarkMode from "~/app/hooks/useDarkMode";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime);

const getFollowedCommunities = (): Communities[] => {
  const storedFollowedCommunities = localStorage.getItem("followedCommunities");
  return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const CommunityDisplayQuery: NextPage = () => {
  const pathname = usePathname();

  const name = pathname.split("/").pop() || "";

  const { data, isLoading, error } =
    api.community.getAllCommunitybyQuery.useInfiniteQuery({
      search: name,
    });

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);
    }
  }, [darkMode]);

  const [followedCommunities, setFollowedCommunities] = useState<Communities[]>(
    () => getFollowedCommunities(),
  );

  useEffect(() => {
    if (followedCommunities) {
      localStorage.setItem(
        "followedCommunities",
        JSON.stringify(followedCommunities),
      );
    }
  }, [followedCommunities]);

  const handleFollow = (e: Communities) => {
    setFollowedCommunities([...followedCommunities, e]);
  };

  const handleUnfollow = (e: UUID) => {
    setFollowedCommunities(
      followedCommunities.filter(
        (followedCommunity) => followedCommunity.id !== e,
      ),
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
      <div className={` ${dark ? "bg-gray-900" : "bg-indigo-50"} font-[Lato]`}>
        <div
          className={` ${
            dark ? "bg-gray-900" : "bg-indigo-50"
          } grid-rows-auto grid w-[100%] grid-cols-10 `}
        >
          <div className="col-start-2 col-end-10 mt-4 min-h-[71vh] w-[100%] lg:col-start-3 lg:col-end-9 3xl:col-start-4 3xl:col-end-8">
            <div>
              {data?.pages.map((page, index) => (
                <div key={index}>
                  {page.allCommunities.map((community: Communities) => (
                    <div key={community.id} className="m-4">
                      <CardsDisplay
                        dark={dark}
                        handleFollow={handleFollow}
                        handleUnfollow={handleUnfollow}
                        followedCommunities={followedCommunities}
                        data={community}
                      ></CardsDisplay>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {data.pages[0]?.allCommunities[0] === undefined && (
              <div className="h-full">
                <NoResults dark={dark}></NoResults>
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
