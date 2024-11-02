"use client";

import NavigationBar from "~/app/_components/organisms/navigationBar";
import Footer from "~/app/_components/atoms/footer";
import IconCommunity from "~/app/_components/assets/community.png";
import BarDotsBlack from "~/app/_components/atoms/barDotsBlack";
import TextAreaComentario from "~/app/_components/atoms/textAreaComentario";
import Avaliacao from "~/app/_components/molecules/avaliacao";
import ComentariosPost from "~/app/_components/organisms/comentariosPost";
import Tag from "~/app/_components/atoms/tag";
import Trending from "~/app/_components/atoms/trending";

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


import { type NextPage } from "next";
import { usePathname } from "next/navigation";
import RejectedPage from "~/app/_components/organisms/rejectedPage";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import { api } from "~/trpc/react";

import Link from "next/link";
import { useState, useEffect } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSessionData from "~/app/hooks/useSessionData";
import { type UUID } from "crypto";
import { type Comments, type Posts } from "~/lib/definitions";
import { useRouter } from "next/navigation";

import LogoHDLIGHT from "~/app/_components/assets/RAIOHDLIGHT.png";
import useDarkMode from "~/app/hooks/useDarkMode";

dayjs.extend(relativeTime);

interface Blocked {
  userId: UUID;
  userName?: string;
}

const getLikedPosts = (): Posts[] => {
  const storedLikes = localStorage.getItem("likedPosts");
  return storedLikes ? JSON.parse(storedLikes) : [];
};

const getLikedComments = (): string[] => {
  const storedLikes = localStorage.getItem("likedComments");
  return storedLikes ? JSON.parse(storedLikes) : [];
};

const getCurrentBlocked = (): Blocked[] => {
  const storedBlocked = localStorage.getItem("userBlocked");
  return storedBlocked ? JSON.parse(storedBlocked) : [];
};

const getCurrentSaved = (): Posts[] => {
  const storedSaved = localStorage.getItem("userSaved");
  return storedSaved ? JSON.parse(storedSaved) : [];
};

const getCurrentPosts = (): Posts[] => {
  const storedPosts = localStorage.getItem("userPosts");
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const getCurrentComments = (): Comments[] => {
  const storedComments = localStorage.getItem("userComments");
  return storedComments ? JSON.parse(storedComments) : [];
};

const PostPage: NextPage = () => {
  const router = useRouter();

  const [userPosts, setuserPosts] = useState<Posts[]>(getCurrentPosts());
  const [Local, setLocal] = useState<boolean>(false);

  const [likedPosts, setLikedPosts] = useState<Posts[]>(() => getLikedPosts());
  const [blocked, setBlocked] = useState<Blocked[]>(getCurrentBlocked);
  const [saved, setSaved] = useState<Posts[]>(getCurrentSaved);

  const [userComments, setUserComments] =
    useState<Comments[]>(getCurrentComments);

  const [commentsNumber, setCommentsNumber] = useState(0);

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);

      console.log(darkMode);
    }
    console.log(darkMode);
  }, [darkMode]);

  console.log(darkMode);

  const [isLiked, setIsLiked] = useState(false);
  const [visible, setVisible] = useState<"visible" | "hidden">("visible");
  const [likedComments, setLikedComments] = useState<string[]>(() =>
    getLikedComments(),
  );
  const [search, setSearch] = useState("Trending");
  const [isAuthor, setIsAuthor] = useState(false);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data, isLoading, error } = api.posts.getPostsByID.useQuery({
    postId: id ?? "",
  });

  const { data: UserData } = useSessionData();

  useEffect(() => {
    if (data && !Local) {
      const postFetch = data.postData?.[0] 
      if (data.postData && postFetch) {
        setIsLiked(likedPosts.some((post) => post.id === postFetch.id as UUID ));
      }
    }
  }, [data]);

  useEffect(() => {
    if (id && UserData) {
      const localData = JSON.parse(localStorage.getItem("userPosts") || "[]");
      const existe = localData.filter(
        (post: Posts) => post.id === (id as UUID),
      );
      console.log(existe);
      console.log(id);
      if (existe) {
        setIsAuthor(
          (existe[0]?.user_id as UUID) === (UserData?.user.id as UUID),
        );
      }
      console.log(id);
      console.log(UserData.user.id);
    }
  }, [UserData, id]);

  useEffect(() => {
    if (id) {
      const localData = JSON.parse(localStorage.getItem("userPosts") || "[]");
      const existe = localData.filter((post: Posts) => post.id === id);
      if (existe) {
        setLocal(true);
        setuserPosts(existe);
        console.log(existe);
      } else {
        setLocal(false);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!!Local && id) {
        setIsLiked(likedPosts.some((post) => post.id === id as UUID ));
    }
  }, [Local, id]);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem("userBlocked", JSON.stringify(blocked));
  }, [blocked]);

  useEffect(() => {
    localStorage.setItem("userSaved", JSON.stringify(saved));
  }, [saved]);

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

  const handleLiked = () => {
    if (!isLiked && !Local) {
      if(data && data.postData && id) {
        const postFetch = data.postData[0]
        if(postFetch){
          setLikedPosts((e) => [...e, postFetch as Posts]);
          setIsLiked(true);    
          console.log(likedPosts)
        }     
      }
    }
    if (!isLiked && !!Local) {
      if(userPosts){
        console.log(userPosts[0])
        console.log(userPosts)
        setLikedPosts((e) => [...e, userPosts[0] as Posts]);
        setIsLiked(true);
        console.log(likedPosts)
      }
    }
  };

  const handleUnliked = () => {
    if (!!isLiked && !Local) {
      console.log(Local)
      if(data && data.postData && id) {
        const postFetch = data.postData[0]
        if(postFetch){
          setLikedPosts((e) => e.filter((likedPosts) => likedPosts.id !== id));
          setIsLiked(false);    
        }     
      }
    }
    if (!!isLiked && !!Local) {
      console.log(Local)
      if(userPosts && id){
        setLikedPosts((e) => e.filter((likedPosts) => likedPosts.id !== id));
        setIsLiked(false);
      }
    }
  };


  const handleClickSelect = (e: string) => {
    if ((data && data.postData && id) || (Local === true && id)) {
      switch (e) {
        case "Block": {
          if (Local) {
            setBlocked([
              ...blocked,
              {
                userId: userPosts[0]?.user_id!,
                userName: userPosts[0]?.user_name!,
              },
            ]);
          } else if (!Local && data.postData) {
            setBlocked([
              ...blocked,
              {
                userId: data.postData[0]?.user_id!,
                userName: userPosts[0]?.user_name!,
              },
            ]);
          }
          break;
        }
        case "Save": {
          if (Local && userPosts[0]) {
            setSaved([...saved, userPosts[0]]);
            break;
          }
          if (data.postData) {
            setSaved([...saved, data.postData[0] as Posts]);
            break;
          }
        }
        case "Delete": {
          const localData = JSON.parse(
            localStorage.getItem("userPosts") || "[]",
          );
          const existe = localData.filter((post: Posts) => post.id !== id);
          localStorage.setItem("userPosts", JSON.stringify(existe));
          router.back();
          break;
        }
        case "Share": {
          console.log(3);
          break;
        }
      }
    }
  };

  const LinkCommunity =
    data.postData?.[0]?.community_id || (Local && userPosts[0]?.community_id);

  return (
    <>
      <div
        className={`${
          dark ? "bg-gray-900" : "to-bg-white bg-gradient-to-b from-sp-tp-page"
        } `}
      >
        <NavigationBar dark={dark}></NavigationBar>
        <div className="min-h-[72.6vh]">
          <div
            className={` ${
              dark
                ? "bg-gray-900 text-white"
                : "to-bg-white bg-gradient-to-b from-sp-tp-page text-black"
            }  grid-rows-auto grid grid-cols-12 pt-5 lato-font`}
          >
            <div className="col-span-8 col-start-3 row-start-1 row-end-2 flex justify-around pb-5">
              <Link
                href={`/pages/community`}
                className="flex items-center py-2"
              >
                <svg
                  width="21"
                  height="14"
                  viewBox="0 0 21 14"
                  fill="#white"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <path
                    d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z"
                    fill="#6232DA"
                  />
                </svg>
                <p className={` ${dark ? "text-white" : "text-black"} mx-1`}>
                  Back to All Posts
                </p>
              </Link>
              <Link
                href={`/pages/community/${LinkCommunity}`}
                className="flex items-center py-2"
              >
                <p className={` ${dark ? "text-white" : "text-black"} mx-1`}>
                  Go to Community
                </p>
                <svg
                  width="21"
                  height="14"
                  viewBox="0 0 21 14"
                  fill="#white"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotate(270deg)" }}
                >
                  <path
                    d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z"
                    fill="#6232DA"
                  />
                </svg>
              </Link>
            </div>
            <div
              className={`col-start-3 col-end-11 row-start-2 row-end-3 pb-5 ${
                dark ? "bg-gray-950" : "bg-white"
              } rounded-[20px] border border-sp-purpleBright2`}
            ></div>
            {data.postData && data.postData[0] && (
              <div className="col-start-4 col-end-10 row-start-2 row-end-3">
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/pages/community/${data.postData[0].community_id}`}
                  >
                    <img
                      className="h-10 w-10 rounded-full"
                      src={data.postData[0].community_icon || LogoHDLIGHT.src}
                    />
                  </Link>
                  <div className="ml-3 mr-auto flex flex-col lato-font text-base font-semibold">
                    <Link
                      href={`/pages/community/${data.postData[0].community_id}`}
                    >
                      <div>
                        @{data.postData[0]?.community_name}{" "}
                        <span className="text-xs font-normal">•</span>{" "}
                        {dayjs(data.postData[0]?.created_at).fromNow()}
                      </div>
                    </Link>
                    <Link href={`/pages/profile/${data.postData[0].user_id}`}>
                      <p>by {data.postData[0]?.user_name}</p>
                    </Link>
                  </div>
                  <div className="origin-center self-center justify-self-center text-center">
                    <BarDotsBlack
                      isAuthor={isAuthor}
                      handleClickSelect={handleClickSelect}
                      post_id={data.postData[0].id}
                      user_id={data.postData[0].user_id}
                      setSavedUsers={setSaved}
                      setBlockedUsers={setBlocked}
                      options={
                        isAuthor
                          ? ["Save", "Delete", "Share"]
                          : ["Save", "Block", "Share"]
                      }
                    ></BarDotsBlack>
                  </div>
                </div>
                <div className="">
                  <div>
                    <div className="py-2 lato-font text-3xl font-bold">
                      {data.postData[0]?.content}
                    </div>
                    <div className="flex flex-wrap">
                      {data.postData[0].tags?.map((tag, index) => (
                        <div key={index}>
                          <Tag
                            notclick={true}
                            style={"bg-sp-purple text-white"}
                            text={`${tag}`}
                          ></Tag>
                        </div>
                      ))}
                    </div>
                    <div className="w-full py-2 lato-font text-xl font-medium">
                      {data.postData[0]?.content_post}
                    </div>
                  </div>
                  {data.postData[0].url_image && (
                    <div className="relative h-[650px] w-full grid-cols-5 overflow-hidden rounded-3xl">
                      <div
                        className="absolute inset-0 col-start-1 col-end-6 bg-cover bg-center blur-md filter"
                        style={{
                          backgroundImage: `url(${data.postData[0].url_image})`,
                          minWidth: "500px",
                          minHeight: "500px",
                        }}
                      ></div>

                      <div className="absolute inset-0 col-start-1 col-end-6 bg-black bg-opacity-50"></div>

                      <img
                        src={`${data.postData[0].url_image}`}
                        alt="Post Image"
                        className="relative z-10 mx-auto h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="my-2">
                    <Avaliacao
                      dark={dark}
                      handleLiked={handleLiked}
                      handleUnliked={handleUnliked}
                      likedState={isLiked}
                      comments={data.postData[0].comments}
                      likes={
                        isLiked
                          ? Number(data.postData[0].likes) + 1
                          : data.postData[0].likes
                      }
                    ></Avaliacao>
                  </div>
                </div>
                <div className="mb-0 flex flex-col justify-items-end self-end">
                  {UserData && (
                    <TextAreaComentario
                      dark={dark}
                      userComments={userComments}
                      setUserComments={setUserComments}
                      setVisible={setVisible}
                      user_icon={UserData.user.url_icon as string}
                      user_id={UserData.user.id as UUID}
                      user_name={UserData.user.name as string}
                      post_id={data.postData[0].id}
                      started={false}
                    ></TextAreaComentario>
                  )}
                  <>
                    {visible === "visible" && (
                      <div
                        className="flex min-h-0 justify-center"
                        style={{ visibility: visible }}
                      >
                        <Trending
                          dark={dark}
                          search={search}
                          setSearch={setSearch}
                          topics={["Recent", "Trending", "Old", "Discussed"]}
                        ></Trending>
                      </div>
                    )}
                    <ComentariosPost
                      dark={dark}
                      userComments={userComments}
                      setUserComments={setUserComments}
                      size={setCommentsNumber}
                      search={search}
                      setLikedComments={setLikedComments}
                      likedComments={likedComments}
                      setVisible={setVisible}
                      postID={data.postData[0].id}
                    ></ComentariosPost>
                  </>
                </div>
              </div>
            )}
            :
            {userPosts[0] && Local === true && (
              <div className="col-start-4 col-end-10 row-start-2 row-end-3">
                <div className="mt-4 flex items-center justify-between">
                  <Link href={`/pages/community/${userPosts[0].community_id}`}>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={IconCommunity.src}
                    />
                  </Link>
                  <div className="ml-3 mr-auto flex flex-col lato-font text-base font-semibold">
                    <Link
                      href={`/pages/community/${userPosts[0].community_id}`}
                    >
                      <div>
                        @{userPosts[0].community_name}{" "}
                        <span className="text-xs font-normal">•</span>{" "}
                        {dayjs(userPosts[0].created_at).fromNow()}
                      </div>
                    </Link>
                    <Link href={`/pages/profile/${userPosts[0].user_id}`}>
                      <p>by {userPosts[0].user_name}</p>
                    </Link>
                  </div>
                  <div className="origin-center self-center justify-self-center text-center">
                    <BarDotsBlack
                      isAuthor={isAuthor}
                      options={
                        isAuthor
                          ? ["Save", "Delete", "Share"]
                          : ["Save", "Block", "Share"]
                      }
                      handleClickSelect={handleClickSelect}
                      post_id={userPosts[0].id}
                      user_id={userPosts[0].user_id}
                      setSavedUsers={setSaved}
                      setBlockedUsers={setBlocked}
                    ></BarDotsBlack>
                  </div>
                </div>
                <div className="">
                  <div>
                    <div className="py-2 lato-font text-3xl font-bold">
                      {userPosts[0].content}
                    </div>
                    <div className="flex flex-wrap">
                      {userPosts[0].tags?.map((tag, index) => (
                        <div key={index}>
                          <Tag
                            notclick={true}
                            style={"bg-sp-purple text-white"}
                            text={`${tag}`}
                          ></Tag>
                        </div>
                      ))}
                    </div>
                    <div className="max-w-[700px] py-2 lato-font text-xl font-medium">
                      {userPosts[0].content_post}
                    </div>
                  </div>
                  {userPosts[0].url_image && (
                    <div className="relative h-[650px] w-full grid-cols-5 overflow-hidden rounded-3xl">
                      <div
                        className="absolute inset-0 col-start-1 col-end-6 bg-cover bg-center blur-md filter"
                        style={{
                          backgroundImage: `url(${userPosts[0].url_image})`,
                          minWidth: "500px",
                          minHeight: "500px",
                        }}
                      ></div>

                      <div className="absolute inset-0 col-start-1 col-end-6 bg-black bg-opacity-50"></div>

                      <img
                        src={`${userPosts[0].url_image}`}
                        alt="Post Image"
                        className="relative z-10 mx-auto h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="my-2">
                    <Avaliacao
                      dark={dark}
                      handleLiked={handleLiked}
                      handleUnliked={handleUnliked}
                      likedState={isLiked}
                      comments={commentsNumber}
                      likes={
                        isLiked
                          ? Number(userPosts[0].likes) + 1
                          : userPosts[0].likes
                      }
                    ></Avaliacao>
                  </div>
                </div>
                <div className="mb-0 flex flex-col justify-items-end self-end">
                  <TextAreaComentario
                    dark={dark}
                    userComments={userComments}
                    setUserComments={setUserComments}
                    setVisible={setVisible}
                    user_icon={UserData?.user.url_icon as string}
                    user_id={UserData?.user.id as UUID}
                    user_name={UserData?.user.name as string}
                    post_id={userPosts[0].id}
                    started={false}
                  ></TextAreaComentario>
                  <>
                    {visible === "visible" && (
                      <div
                        className="flex min-h-0 justify-center"
                        style={{ visibility: visible }}
                      >
                        <Trending
                          dark={dark}
                          search={search}
                          setSearch={setSearch}
                          topics={["Recent", "Trending", "Old", "Discussed"]}
                        ></Trending>
                      </div>
                    )}
                    <ComentariosPost
                      dark={dark}
                      userComments={userComments}
                      setUserComments={setUserComments}
                      size={setCommentsNumber}
                      search={search}
                      setLikedComments={setLikedComments}
                      likedComments={likedComments}
                      setVisible={setVisible}
                      postID={userPosts[0].id}
                    ></ComentariosPost>
                  </>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default PostPage;
