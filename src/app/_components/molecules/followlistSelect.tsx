import { type UUID } from "crypto";
import { type Followers } from "~/lib/definitions";
import { api } from "~/trpc/react";
import NoResults from "../atoms/noResults";
import LoadingPage from "../organisms/loadingPage";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

interface User {
  id: UUID;
  email?: string;
  name: string;
  url_icon: string;
  url_banner: string;
  description: string;
}

interface FollowListSelectProps {
  followUser: UUID;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const getFollowedUsers = (): User[] => {
  const storedFollowedUsers = localStorage.getItem("followedUsers");
  return storedFollowedUsers ? JSON.parse(storedFollowedUsers) : [];
};

const FollowListSelect = ({ followUser, setIsOpen }: FollowListSelectProps) => {
  const [followedUsers, setFollowedUsers] = useState<User[]>(() =>
    getFollowedUsers(),
  );

  const { data, isLoading, error } = api.user.getUserFollowing.useInfiniteQuery(
    { userId: followUser as string },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    if (followedUsers && data) {
      if (data.pages[0]?.allPosts.length > 0) {
        setFollowedUsers([]);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <LoadingPage></LoadingPage>
      </div>
    );
  }

  const handleSelect = () => {
    setIsOpen(false);
  };

  return (
    <>
      {followedUsers.length < 1 && (
        <>
          {data?.pages.map((page, index) => (
            <div key={index}>
              {page.allPosts.map((follow: Followers) => (
                <div key={follow.follower_id}>
                  <div className="h-full p-2">
                    <div className="col-span-4 row-span-1 rounded-3xl border border-sp-purpleBright2 bg-white p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-grow flex-row flex-nowrap justify-between">
                          <div className="line-clamp-2 flex items-center  gap-3 overflow-x-hidden">
                            <img
                              className="h-12 w-12 rounded-3xl object-cover"
                              src={`${
                                follow.user_icon !== null
                                  ? follow.user_icon
                                  : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"
                              }`}
                              alt=""
                            />
                            <div className="flex flex-col items-start">
                              <h3 className="line-clamp-2 text-xl font-bold">{`${follow.user_name}`}</h3>
                              <p className=" line-clamp-2 overflow-x-hidden text-start text-base">{`${follow.user_description}`}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleSelect}
                          className="self-center rounded bg-sp-purpleBright2 px-4 py-2 text-white hover:bg-sp-accent hover:text-black"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {data && data?.pages[0]?.allPosts.length == 0 && (
            <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[34.5vh]">
              <NoResults dark={false}></NoResults>
            </div>
          )}
        </>
      )}
      {followedUsers &&
        followedUsers.length > 0 &&
        followedUsers.map((user, index) => (
          <div className="" key={index}>
            <div key={user.id}>
              <div className="h-fit p-2">
                <div className="col-span-4 row-span-1 rounded-3xl border border-sp-purpleBright2 bg-white p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-grow flex-row flex-nowrap justify-between">
                      <div className="line-clamp-2 flex items-center  gap-3 overflow-x-hidden">
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
                    <button
                      onClick={handleSelect}
                      className="self-center rounded bg-sp-purpleBright2 px-4 py-2 text-white hover:bg-sp-accent hover:text-black"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FollowListSelect;
