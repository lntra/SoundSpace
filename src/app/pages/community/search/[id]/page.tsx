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
import CommunityPostSecond from "~/app/_components/molecules/communityPostSecond";
import { type UUID } from "crypto";
import NoResults from "~/app/_components/atoms/noResults";
import { useEffect, useState } from "react";
import useDarkMode from "~/app/hooks/useDarkMode";
import { type Posts } from "~/lib/definitions";
import useSessionData from "~/app/hooks/useSessionData";

dayjs.extend(relativeTime);

interface Blocked {
  userId: UUID;
  userName?: string;
}

const getLikedPosts = (): string[] => {
  const storedLikes = localStorage.getItem("likedPosts");
  return storedLikes ? JSON.parse(storedLikes) : [];
};

const getCurrentSaved = (): Posts[] => {
  const storedSaved = localStorage.getItem("userSaved");
  return storedSaved ? JSON.parse(storedSaved) : [];
};

const getCurrentBlocked = (): Blocked[] => {
  const storedBlocked = localStorage.getItem("userBlocked");
  return storedBlocked ? JSON.parse(storedBlocked) : [];
};

const CommunityDisplaySearch: NextPage = () => {
  const pathname = usePathname();

  const name = pathname.split("/").pop() || "";

  const [saved, setSaved] = useState<Posts[]>(getCurrentSaved);
  const [likedPosts, setLikedPosts] = useState<string[]>(() => getLikedPosts());
  const [blocked, setBlocked] = useState<Blocked[]>(getCurrentBlocked);

  const { data, isLoading, error } =
    api.posts.getPostsbyQueryInfinite.useInfiniteQuery({
      search: name,
    });

  const { data: user } = useSessionData();

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      console.log(darkMode);
    }
    console.log(darkMode);
  }, [darkMode]);

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

  const handleDelete = (tagText: string) => {
    const localData = JSON.parse(localStorage.getItem("userPosts") || "[]");
    const existe = localData.filter((post: Posts) => post.id !== tagText);
    localStorage.setItem("userPosts", JSON.stringify(existe));

    const localSaved = JSON.parse(localStorage.getItem("userSaved") || "[]");
    const existeSaved = localSaved.filter((post: Posts) => post.id !== tagText);
    localStorage.setItem("userPosts", JSON.stringify(existeSaved));

    const localLiked = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    const existeLikes = localLiked.filter((post: Posts) => post.id !== tagText);
    localStorage.setItem("userPosts", JSON.stringify(existeLikes));

    const localComments = JSON.parse(
      localStorage.getItem("userComments") || "[]",
    );
    const existeComments = localComments.filter(
      (post: Posts) => post.id !== tagText,
    );
    localStorage.setItem("userPosts", JSON.stringify(existeComments));
  };

  return (
    <>
      <NavigationBar dark={dark}></NavigationBar>
      <div className={`${dark ? "bg-gray-900" : "bg-sp-tp-page"}`}>
        <div
          className={`grid-rows-auto grid w-[100%] grid-cols-10 ${
            dark ? "bg-gray-900" : "bg-sp-tp-page"
          }`}
        >
          <div className="col-span-12 mt-4 min-h-[71vh] w-[100%] sm:col-start-2 sm:col-end-10 md:col-start-3 md:col-end-9">
            <div>
              {data?.pages.map((page, index) => (
                <div key={index}>
                  {page.allPosts.map((post: Posts) => (
                    <div key={post.id}>
                      <CommunityPostSecond
                        dark={dark}
                        //
                        post={post}
                        handleDelete={handleDelete}
                        //
                        title={post.content}
                        content={post.content_post}
                        date={post.created_at}
                        user_id={post.user_id}
                        post_id={post.id}
                        community_id={post.community_id}
                        user_name={post.user_name}
                        community_name={post.community_name}
                        url_image={post.url_image}
                        tags={post.tags}
                        community_icon={post.community_icon}
                        optionalStyle={true}
                        likes={Number(post.likes)}
                        comments={Number(post.comments)}
                        //blocks
                        blockedUsers={blocked}
                        setBlockedUsers={setBlocked}
                        //
                        likedPosts={likedPosts}
                        setLikedPosts={setLikedPosts}
                        //saved
                        savedUsers={saved}
                        setSavedUsers={setSaved}
                        //user
                        userID={user?.user.id as UUID}
                      ></CommunityPostSecond>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {data.pages[0]?.allPosts[0] === undefined && (
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

export default CommunityDisplaySearch;
