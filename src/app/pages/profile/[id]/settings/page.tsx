"use client";

import { usePathname } from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DropdownMin from "~/app/_components/atoms/dropdownMin";
import { api } from "~/trpc/react";
import NoResults from "~/app/_components/atoms/noResults";
import useSessionData from "~/app/hooks/useSessionData";
import { useEffect, useState } from "react";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import { type NextPage } from "next";
import { type UUID } from "node:crypto";

dayjs.extend(relativeTime);

interface Blocked {
  userId: UUID;
  userName: string;
}

interface FormValues {
  [key: string]: boolean;
  darkmode: boolean;
  GeneralReplies: boolean;
  YourReplies: boolean;
  LikedReply: boolean;
  sentPost: boolean;
  PostReplied: boolean;
  PostLiked: boolean;
}

const getCurrentBlocked = (): Blocked[] => {
  const storedBlocked = localStorage.getItem("userBlocked");
  return storedBlocked ? JSON.parse(storedBlocked) : [];
};

const Settings: NextPage = () => {
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

  const [isAdmin, setIsAdmin] = useState(false);

  const [sessionId, setSessionId] = useState("");

  const [blocked, setBlocked] = useState(getCurrentBlocked);

  const [formValues, setFormValues] = useState<FormValues>({
    //darkmode
    darkmode: false,
    //comments
    GeneralReplies: false,
    YourReplies: true,
    LikedReply: true,
    //friends
    sentPost: true,
    //post
    PostReplied: true,
    PostLiked: false,
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem("userSettings");
    if (storedSettings) {
      setFormValues(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(formValues));
  }, [formValues]);

    useEffect(() => {
    if (session && name) {
      setIsAdmin(session.user.id === name);
    }
    return;
  }, [session, name]);

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

  const handleBlock = (name: string) => {
    const existe = blocked.filter((block: Blocked) => block.userName !== name);
    setBlocked(existe);
    localStorage.setItem("userBlocked", JSON.stringify(existe));
  };

  const handleToggle = (key: string) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <span className="header-background grid min-h-screen w-[100%] grid-cols-pr bg-sp-purple">
        <div className="fixed left-0 col-span-1 h-[100%] w-[100%] min-w-[90px] max-w-[90px] bg-sp-purple pr-[1px]">
          <DropdownMin link={sessionId}></DropdownMin>
        </div>
        <div className="z-50 col-start-2 col-end-13 h-[100%] w-[100%] font-[Lato]">
          <div className="grid-rows-auto grid w-[100%] grid-cols-10">
            <div className="col-start-2 col-end-10 mt-4 min-h-[71vh] w-[100%] lg:col-start-2 lg:col-end-10 xl:col-start-3 xl:col-end-9 3xl:col-start-3 3xl:col-end-9">
              {!isAdmin && (
                <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                  <NoResults
                    text={`You don't have permission to see this user's settings`}
                    dark={true}
                  ></NoResults>
                </div>
              )}

              {!!isAdmin && (
                <div>
                  <div className="h-full p-2">
                    <div className="row-start-8 row-end-9 col-start-2 col-end-12 mb-5 mt-5 grid h-[90.75vh] w-[100%] auto-rows-auto grid-cols-12 rounded-[20px] bg-black bg-opacity-40 pb-5 font-semibold text-white">
                      <div className="col-span-12 p-4">
                        <h1 className="border-b-2 border-sp-purpleBright2 text-[28px] font-bold">
                          {session?.user.name as string}'s Settings
                        </h1>
                        <div>
                          <div className="border-b-2 border-sp-purpleBright2 p-4">
                            <div className="flex justify-between gap-4">
                              <div className="flex w-[50%] flex-col">
                                <h1 className="text-2xl">Blocked</h1>
                                <p className="text-lg">
                                  Control the list of blocked users.
                                </p>
                                {blocked.length < 1 && (
                                  <div>
                                    <h1 className="font-light text-gray-200">
                                      It seems you have no users blocked
                                    </h1>
                                  </div>
                                )}
                              </div>
                              <div className="flex h-min max-h-[162px] w-[50%] flex-col items-center overflow-y-auto align-middle">
                                <div className="w-[50%] ">
                                  {blocked.length > 0 && (
                                    <div className=" ">
                                      {blocked.map((block, index) => (
                                        <div
                                          key={index}
                                          className="my-2 flex justify-between rounded-full border-2 border-white p-2"
                                        >
                                          <p>{block.userName}</p>
                                          <button
                                            onClick={() =>
                                              handleBlock(block.userName)
                                            }
                                            className="text-base font-bold hover:text-red-500"
                                          >
                                            X
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="border-b-2 border-sp-purpleBright2 p-4">
                            <div className="flex justify-between gap-4">
                              <div className="flex w-[50%] flex-col">
                                <h1 className="text-2xl font-semibold">
                                  Notifications
                                </h1>
                                <p className="text-lg">
                                  Select when you will be notified considering
                                  the following situations.
                                </p>

                                <h1 className="p-4 text-xl font-semibold">
                                  Comments
                                </h1>
                                <div className="flex flex-col justify-center border-l-2 border-white align-middle">
                                  {[
                                    {
                                      label:
                                        "New Replies in a Discussion You Joined",
                                      key: "GeneralReplies",
                                    },
                                    {
                                      label: "Replied to on comments",
                                      key: "YourReplies",
                                    },
                                    {
                                      label: "Likes to your reply",
                                      key: "LikedReply",
                                    },
                                  ].map(({ label, key }) => (
                                    <div
                                      key={key}
                                      className="my-2 flex justify-center text-center align-middle"
                                    >
                                      <p className="w-[80%] p-4 text-start align-middle">
                                        {label}
                                      </p>
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4  transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4 transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            !formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col justify-end align-bottom">
                                <h1 className="p-4 text-xl font-semibold">
                                  Friends
                                </h1>
                                <div className="flex flex-col justify-center border-l-2 border-white align-middle">
                                  {[
                                    {
                                      label: "Sent Post by a Friend",
                                      key: "sentPost",
                                    },
                                  ].map(({ label, key }) => (
                                    <div
                                      key={key}
                                      className="my-2 flex justify-center text-center align-middle"
                                    >
                                      <p className="w-[80%] p-4 text-start align-middle">
                                        {label}
                                      </p>
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4  transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4 transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            !formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <h1 className="p-4 text-xl font-semibold">
                                  Posts
                                </h1>
                                <div className="flex flex-col justify-center border-l-2 border-white align-middle">
                                  {[
                                    {
                                      label: "New replies on your post",
                                      key: "PostReplied",
                                    },
                                    {
                                      label: "Likes on your post",
                                      key: "PostLiked",
                                    },
                                  ].map(({ label, key }) => (
                                    <div
                                      key={key}
                                      className="my-2 flex justify-center text-center align-middle"
                                    >
                                      <p className="w-[80%] p-4 text-start align-middle">
                                        {label}
                                      </p>
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4  transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4 transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            !formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="h-max  border-sp-purpleBright2 p-4">
                            <h1 className="text-2xl">Theme</h1>
                            <p className="text-lg">
                              Select which type of Theme you prefer for the main
                              site.
                            </p>
                            <div>
                              <div className="flex flex-col justify-center border-l-2 border-white align-middle">
                                {[{ label: "Darkmode", key: "darkmode" }].map(
                                  ({ label, key }) => (
                                    <div
                                      key={key}
                                      className="my-2 flex w-[50%] justify-between text-center align-middle"
                                    >
                                      <p className="w-[80%] p-4 text-start align-middle">
                                        {label}
                                      </p>
                                      <div className="flex items-center justify-center gap-2">
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4  transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => handleToggle(key)}
                                          className={`h-[60px] w-[60px] rounded-full border-2 border-sp-purpleBright2 p-4 transition-colors duration-200 hover:border-sp-accent hover:bg-sp-accent hover:text-black ${
                                            !formValues[key]
                                              ? "bg-sp-accent text-black"
                                              : ""
                                          }`}
                                        >
                                          No
                                        </button>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default Settings;
