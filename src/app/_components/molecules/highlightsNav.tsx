"use client";

import Link from "next/link";
import Button from "../atoms/button";
import ResponsiveText from "../atoms/responsiveText";
import PlaceholderProps from "./placeholderProps";
import UserPost from "./UserPost";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import { type Posts } from "~/lib/definitions";
import { type UUID } from "crypto";

interface HighlightsNavProps {
  type?: string;
  dark: boolean;
}

interface Blocked {
  userId: UUID;
  userName: string;
}

const getCurrentBlocked = (): Blocked[] => {
  const storedBlocked = localStorage.getItem("userBlocked");
  return storedBlocked ? JSON.parse(storedBlocked) : [];
};

const getCurrentPosts = (): Posts[] => {
  const storedPosts = localStorage.getItem("userPosts");
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const HighlightsNav: React.FC<HighlightsNavProps> = ({ type, dark }) => {

  const [blocked, setBlocked] = useState<Blocked[]>(getCurrentBlocked());
  const [userPosts, setuserPosts] = useState<Posts[]>(getCurrentPosts());

  const [search, setSearch] = useState("Trending");

  const fetchPosts = api.posts.getAllPosts.useInfiniteQuery(
    { tags: undefined, route: search, alternateLimit: 4 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      queryKey: [
        "posts.getAllPosts",
        { route: search, tags: undefined, alternateLimit: 4 },
      ],
    },
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = fetchPosts;

  useEffect(() => {
    if (data) {
      const userPosts = JSON.parse(localStorage.getItem("userPosts") || "[]");
      const serverPosts = data.pages.flatMap((page) => page.allPosts);

      let mergedPosts = [...userPosts, ...serverPosts];

      console.log(mergedPosts);

      if (mergedPosts.length < 1) {
        setSearch("Hot Topics");
        return;
      }

      mergedPosts.sort((a: Posts, b: Posts) => (b.likes || 0) - (a.likes || 0));

      if (blocked.length > 0) {
        const blockedUserIds = blocked.map((user: Blocked) => user.userId);

        mergedPosts = mergedPosts.filter(
          (post: Posts) => !blockedUserIds.includes(post.id),
        );
      }

      if (mergedPosts.length > 4) {
        mergedPosts = mergedPosts.slice(0, 4);
      }

      setuserPosts(mergedPosts);
    }
  }, [data, search]);

  return (
    <>
      <PlaceholderProps
        dark={dark}
        title="Weekly Highlights"
        className={`flex w-full flex-col  items-center`}
      >
        <div
          className={`flex-grow ${
            type === "home" ? "max-h-[410px]" : "max-h-[565px]"
          } w-full p-3`}
        >
          {data?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
              {userPosts.map((post: Posts, postIndex) => (
                <Link
                  href={`/pages/community/post/${post.id}`}
                  className="w-full"
                  key={postIndex}
                >
                  <div
                    className={`w-full gap-1 pb-2 pt-2 text-gray-950 ${
                      dark ? "text-white " : "text-black hover:bg-gray-200 "
                    } overflow-hidden border-b-[1px] border-solid border-sp-purpleBright2`}
                  >
                    <div className="grid auto-cols-auto auto-rows-auto">
                      <div className="text-wrap col-start-1 col-end-2 row-start-1 row-end-2 flex h-[100%] w-full items-center whitespace-nowrap">
                        <UserPost
                          dark={dark}
                          home={true}
                          img={post.community_icon}
                          text={post.community_name}
                          time={post.created_at}
                          userId={post.id}
                        />
                      </div>
                      <div className="text-wrap col-start-1 col-end-2 row-start-2 row-end-3 w-full text-base font-bold">
                        <ResponsiveText text={post.content} />
                      </div>
                      <div
                        className={`col-start-1 col-end-2 row-start-3 row-end-4 whitespace-nowrap ${
                          dark ? "text-white" : "text-black"
                        }`}
                      >
                        <div className="text-wrap flex flex-row gap-1 text-sm">
                          <ResponsiveText
                            text={String(post.comments) + " " + "Comments"}
                          />
                          <p className="text-[11px]"></p>
                          <ResponsiveText
                            text={String(post.likes) + " " + "Likes"}
                          />
                        </div>
                      </div>
                      {post.url_image !== null &&
                        post.url_image !== undefined && (
                          <div className="col-start-2 col-end-3 row-start-1 row-end-3 flex flex-col items-end justify-end pl-1">
                            <div className="inset-0 h-20 w-20 rounded-[20px] bg-black 3xl:h-24 3xl:w-24">
                              <img
                                className="h-full w-full rounded-[20px] bg-black object-cover"
                                src={post.url_image}
                                alt=""
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <Link
          href={`/pages/community/display`}
          className="flex h-16 justify-center align-middle"
        >
          <Button text="Find Communities" />
        </Link>
      </PlaceholderProps>
    </>
  );
};

export default HighlightsNav;
