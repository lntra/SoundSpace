import { type UUID } from "crypto";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avaliacao from "./avaliacao";
import Tag from "../atoms/tag";
import BarDotsBlack from "../atoms/barDotsBlack";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type Posts } from "~/lib/definitions";

dayjs.extend(relativeTime);

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


interface Blocked {
  userId: UUID;
  userName?: string;
}

interface Saved {
  postId: UUID;
}

interface CommunityPostSecondProps {
  //post
  post: Posts;
  //view
  color?: string;
  pressed?: string;
  title: string;
  content?: string;
  date: Date;
  user_id: UUID;
  post_id: UUID;
  community_id: UUID;
  url_image?: string;
  tags?: string[];
  onTagClick?: (tag: string) => void;
  optionalStyle?: boolean;
  //joins
  user_name: string;
  community_name: string;
  community_icon?: string;
  likes?: number;
  comments?: number;
  //likestate
  likedPosts: string[];
  setLikedPosts: Dispatch<SetStateAction<string[]>>;
  //blockstate
  blockedUsers: Blocked[];
  setBlockedUsers?: Dispatch<SetStateAction<Blocked[]>>;
  // savestate
  savedUsers: Posts[];
  setSavedUsers: Dispatch<SetStateAction<Posts[]>>;
  // refresh
  refresh?: boolean;
  setRefresh?: Dispatch<SetStateAction<boolean>>;
  // posts
  handleDelete: (tagText: string) => void;
  // user
  userID: UUID;
  // style
  dark: boolean;
}

const CommunityPostSecond: React.FC<CommunityPostSecondProps> = ({
  post,
  userID,
  handleDelete,
  refresh,
  setRefresh,
  blockedUsers,
  savedUsers,
  setSavedUsers,
  setBlockedUsers,
  likedPosts,
  setLikedPosts,
  likes,
  comments,
  optionalStyle,
  title,
  content,
  date,
  user_id,
  post_id,
  community_id,
  user_name,
  community_name,
  url_image,
  tags,
  community_icon,
  onTagClick,
  dark,
}) => {
  //Setting up if the post is already liked
  const [isLiked, setIsLiked] = useState(likedPosts.includes(post_id));
  //Setting up likes number to be able to change state
  const [postlikes, setLikes] = useState<number>(
    isLiked ? Number(likes) + 1 : Number(likes || 0),
  );

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleLiked = () => {
    if (!isLiked) {
      setLikedPosts((e) => [...e, post_id]);
      setLikes((e) => e + 1);
      setIsLiked(true);
    }
  };

  const isAuthor = user_id === userID;

  const handleClickSelect = (e: string) => {
    switch (e) {
      case "Block": {
        console.log(1);
        if (setBlockedUsers && setRefresh) {
          setBlockedUsers([
            ...blockedUsers,
            { userId: user_id, userName: user_name },
          ]);
          setRefresh(!refresh);
        }
        break;
      }
      case "Save": {
        console.log(2);
        if (!savedUsers.some((savedPost: Posts) => savedPost.id === post.id)) {
          setSavedUsers([...savedUsers, post]);
        }
        break;
      }
      case "Delete": {
        handleDelete(post_id);
        if (setRefresh) setRefresh(!refresh);
        break;
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("userBlocked", JSON.stringify(blockedUsers));
  }, [blockedUsers]);

  useEffect(() => {
    localStorage.setItem("userSaved", JSON.stringify(savedUsers));
  }, [savedUsers]);

  const handleUnliked = () => {
    if (isLiked) {
      setLikedPosts((e) => e.filter((likedPost) => likedPost !== post_id));
      setLikes((e) => e - 1);
      setIsLiked(false);
    }
  };

  return (
    <>
      <div>
        <div
          className={`text-black ${
            optionalStyle ? "" : ""
          } grid-rows-auto mb-5 grid grid-cols-12 lato-font`}
        >
          <div
            className={`row-span-1 ${
              optionalStyle ? "" : `${dark ? "bg-gray-900" : "bg-none"}`
            } grid-rows-auto col-span-full grid grid-cols-12`}
          >
            <Link
              prefetch={true}
              href={`/pages/community/post/${post_id}`}
              className={`col-start-2 col-end-12 row-start-2 row-end-4 py-5 ${
                dark ? "bg-gray-950 text-white" : "bg-white text-black"
              } rounded-[20px] border border-sp-purpleBright2`}
            ></Link>
            <div
              className={`col-start-3 col-end-11 row-start-2 row-end-3 ${
                dark ? "text-white" : "text-black"
              }`}
            >
              <div className="mt-4 flex items-center justify-between">
                <Link prefetch={true} href={`/pages/community/${community_id}`}>
                  <img
                    loading="lazy"
                    className="mr-3 h-10 w-10 rounded-full object-cover"
                    src={`${
                      community_icon
                        ? community_icon
                        : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"
                    }`}
                  />
                </Link>
                <Link
                  prefetch={true}
                  href={`/pages/community/post/${post_id}`}
                  className="mr-auto flex w-full flex-col lato-font text-base font-semibold"
                >
                  <Link
                    className="w-fit font-bold"
                    prefetch={true}
                    href={`/pages/community/${community_id}`}
                  >
                    @{community_name}{" "}
                    <span className="text-xs font-normal">•</span>{" "}
                    <span className="font-normal">{dayjs(date).fromNow()}</span>
                  </Link>
                  <Link
                    className="w-fit"
                    prefetch={true}
                    href={`/pages/profile/${user_id}`}
                  >
                    by {user_name}
                  </Link>
                </Link>
                <div className="origin-center self-center justify-self-center text-center">
                  <BarDotsBlack
                    handleClickSelect={handleClickSelect}
                    setSavedUsers={setSavedUsers}
                    setBlockedUsers={setBlockedUsers}
                    user_id={user_id}
                    post_id={post_id}
                    isAuthor={isAuthor}
                    options={
                      isAuthor
                        ? ["Save", "Delete", "Share"]
                        : ["Save", "Block", "Share"]
                    }
                  ></BarDotsBlack>
                </div>
              </div>
              <Link
                prefetch={true}
                href={`/pages/community/post/${post_id}`}
                className="w-full"
              >
                <div className="w-fit py-4 lato-font text-2xl font-bold">
                  {title}
                </div>
              </Link>
              <div className="flex w-full flex-col">
                <div className="flex w-fit flex-wrap">
                  {tags?.map((tag, index) => (
                    <Tag
                      key={index}
                      onClick={onTagClick}
                      style="bg-sp-purple text-white my-1 hover:bg-sp-accent hover:text-black transition-colors duration-200"
                      text={`${tag}`}
                    ></Tag>
                  ))}
                </div>
              </div>
              {url_image ? (
                <div className="w-[100%] pb-4 pt-4">
                  <Link
                    prefetch={true}
                    href={`/pages/community/post/${post_id}`}
                    className="mb-4 mt-4 w-[100%]"
                  >
                    <div className="relative h-[500px] w-full grid-cols-5 overflow-hidden rounded-3xl">
                      <div
                        className="absolute inset-0 col-start-1 col-end-6 bg-cover bg-center blur-md filter"
                        style={{
                          backgroundImage: `url(${url_image})`,
                          minWidth: "500px",
                          minHeight: "500px",
                        }}
                      ></div>

                      <div className="absolute inset-0 col-start-1 col-end-6 bg-black bg-opacity-50"></div>

                      <img
                        src={`${url_image}`}
                        alt="Post Image"
                        className="relative z-10 mx-auto h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>
              ) : (
                <Link
                  prefetch={true}
                  href={`/pages/community/post/${post_id}`}
                  className="mb-4 mt-4 w-[100%]"
                >
                  <div className="py-4">
                    <h2 className="text-lg">{content}</h2>
                  </div>
                </Link>
              )}
            </div>
            <div className="col-span-full col-start-3 col-end-12 row-span-1 row-start-3 row-end-4 pb-4">
              <Avaliacao
                likedState={isLiked}
                handleLiked={handleLiked}
                handleUnliked={handleUnliked}
                comments={comments}
                likes={postlikes}
                dark={dark}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPostSecond;
