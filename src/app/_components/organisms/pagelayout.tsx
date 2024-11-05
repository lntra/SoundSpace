import DropdownMin from "../atoms/dropdownMin";
import Hands from "../assets/Hands.png";
import InfoUser from "../molecules/infoUser";
import ConfigButton from "../molecules/config";
import Tabs from "../molecules/tabs";
import LoadingPage from "./loadingPage";
import { type UUID } from "crypto";
import NoResults from "../atoms/noResults";
import { useEffect, useState } from "react";

import { api } from "~/trpc/react";
import CommunityPostSecond from "../molecules/communityPostSecond";
import {
  type Comments,
  type CommentsWithReplies,
  type Posts,
} from "~/lib/definitions";
import FollowButton from "../molecules/follow";
import CommentsItems from "../molecules/commentsItems";
import { organizeComments } from "./comentariosPost";
import NavigationBar from "./navigationBar";
import useDarkMode from "~/app/hooks/useDarkMode";

interface Blocked {
  userId: UUID;
  userName?: string;
}

interface User {
  id: UUID;
  email?: string;
  name: string;
  url_icon: string;
  url_banner: string;
  description: string;
}

interface PageLayoutProps {
  session: {
    id: UUID;
    email?: string;
    name: string;
    url_icon: string;
    url_banner: string;
    description: string;
  };
  user: {
    id: UUID;
    email?: string;
    name: string;
    url_icon: string;
    url_banner: string;
    description: string;
  };
}

const getFollowedUsers = (): User[] => {
  const storedFollowedUsers = localStorage.getItem("followedUsers");
  return storedFollowedUsers ? JSON.parse(storedFollowedUsers) : [];
};

const getLikedPosts = (): Posts[] => {
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

const getCurrentPosts = (): Posts[] => {
  const storedPosts = localStorage.getItem("userPosts");
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const getCurrentComments = (): Comments[] => {
  const storedComments = localStorage.getItem("userComments");
  return storedComments ? JSON.parse(storedComments) : [];
};

const getLikedComments = (): string[] => {
  const storedLikes = localStorage.getItem("likedComments");
  return storedLikes ? JSON.parse(storedLikes) : [];
};

const PageLayout = ({ user, session }: PageLayoutProps) => {
  //Local User Data

  const [saved, setSaved] = useState<Posts[]>(getCurrentSaved);
  const [blocked, setBlocked] = useState<Blocked[]>(getCurrentBlocked);
  const [userPosts, setuserPosts] = useState<Posts[]>(getCurrentPosts());
  const [likedPosts, setLikedPosts] = useState<Posts[]>(() => getLikedPosts());
  const [comments, setComments] = useState<Comments[]>(getCurrentComments());
  const [commentsFinal, setCommentsFinal] = useState<CommentsWithReplies[]>([]);
  const [likedComments, setLikedComments] = useState<string[]>(() =>
    getLikedComments(),
  );

  //

  const [followedUsers, setFollowedUsers] = useState<User[]>(() =>
    getFollowedUsers(),
  );

  const isFollowedStart = followedUsers.some(
    (followedUser) => followedUser.id === user.id,
  );

  const [isFollowed, setIsFollowed] = useState(isFollowedStart);

  const followingNumberStart = followedUsers.length;

  const [followingsNumber, setFollowingNumber] = useState(followingNumberStart);

  useEffect(() => {
    const isFollowedUpdate = followedUsers.some(
      (followedUser) => followedUser.id === user.id,
    );
    setIsFollowed(isFollowedUpdate);
    setFollowingNumber(followedUsers.length);
  }, [followedUsers, user.id]);

  useEffect(() => {
    if (followedUsers) {
      localStorage.setItem("followedUsers", JSON.stringify(followedUsers));
    }
  }, [followedUsers]);

  const isAdmin = session.id === user.id;

  const handleFollow = () => {
    if (!isFollowed) {
      setFollowedUsers([...followedUsers, user]);
      setIsFollowed(true);
    }
  };

  const handleUnfollow = () => {
    if (isFollowed) {
      setFollowedUsers(
        followedUsers.filter((followedUser) => followedUser.id !== user.id),
      );
      setIsFollowed(false);
    }
  };

    const [profileImage, setProfileImage] = useState(
    user.url_icon === "unset"
      ? "https://placehold.co/400x400/DFE0F1/6232DA?font=lato&text=Icon"
      : user.url_icon,
  );
  const [bannerImage, setBannerImage] = useState(
    user.url_banner === "unset" ? Hands.src : user.url_banner,
  );
  const [ownerPage, setOwnerPage] = useState(false);

  const [dark, setDarkMode] = useState<boolean>(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      setDarkMode(darkMode);
    }
  }, [darkMode]);

  useEffect(() => {
    if (user.id && session.id) {
      if (!isAdmin) {
        {
          setProfileImage(user.url_icon);
          setBannerImage(user.url_banner);
          setOwnerPage(false);
        }
      } else if (isAdmin) {
        const itemIcon = localStorage.getItem("profileImage");
        const itemBanner = localStorage.getItem("bannerImage");
        if (profileImage === "unset" && itemIcon !== null) {
          setProfileImage(itemIcon);
        }
        if (itemIcon === null) {
          if (profileImage === "unset" || profileImage === null) {
            setProfileImage(
              "https://placehold.co/400x400/DFE0F1/6232DA?font=lato&text=Icon",
            );
          }
        }
        if (profileImage === "set" && itemIcon) {
          setProfileImage(itemIcon);
        }
        if (itemBanner === null) {
          if (bannerImage === "unset" || bannerImage === null) {
            setBannerImage(Hands.src);
          }
        }
        if (bannerImage === "unset" && itemBanner !== null) {
          setBannerImage(itemBanner);
        }
        setOwnerPage(true);
      }
    }
  }, [user, session]);

  const [search, setSearch] = useState(1);

  const savedRoute = api.user.getUserSaved.useInfiniteQuery(
    { userId: user.id as string },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === 1,
    },
  );

  const postsRoute = api.user.getUserPosts.useInfiniteQuery(
    { userId: user.id as string },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === 2,
    },
  );

  const likedRoute = api.user.getUserLikes.useInfiniteQuery(
    { userId: user.id as string },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === 3,
    },
  );

  const commentsRoute = api.user.getUserComments.useInfiniteQuery(
    { userId: user.id as string },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: search === 4,
    },
  );

  const getCurrentQuery = () => {
    switch (search) {
      case 1:
        return savedRoute;
      case 2:
        return postsRoute;
      case 3:
        return likedRoute;
      case 4:
        return commentsRoute;
      default:
        return {
          data: null,
          isLoading: false,
          error: null,
          fetchNextPage: () => {},
          hasNextPage: false,
          isFetchingNextPage: false,
        };
    }
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    getCurrentQuery();

  useEffect(() => {
    if (comments) {
      let organizedComments = [];
      if (!!isAdmin) {
        organizedComments = organizeComments(comments);
                setCommentsFinal(organizedComments);
      } else if (!isAdmin && data?.pages[0]?.allPosts) {
        const allPosts = data.pages.flatMap((page) => page.allPosts);
                organizedComments = organizeComments(
          allPosts.filter((comment) => !comment.parent_comment_id),
        );
        setCommentsFinal(organizedComments);
      }
    }
  }, [comments, data, search]);

  const handleUpload = (event: any, type: string) => {
    const file = event.target.files?.[0];

    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (file && file.size > maxSizeInBytes) {
      alert(
        `File is too large! Please upload an image smaller than ${maxSizeInMB}MB.`,
      );
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          if (type === "banner") {
            setBannerImage(reader.result);
            localStorage.setItem("bannerImage", reader.result);
          } else {
            setProfileImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
      <style>
        {`

            html {
                background: #6232DA;
            }

            /* width */
            ::-webkit-scrollbar {
                width: 10px;
            }
            
            /* Track */
            ::-webkit-scrollbar-track {
                background: #DFE0F1;
                border-radius: 5px;
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #6232DA;
                border-radius: 5px;
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #A9FB1A;
            }
            .image-container {
                position: relative;
                display: inline-block;
                cursor: pointer;
            }
            .image-container img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .image-container::after {
                content: 
                url('data:image/svg+xml;utf8,<svg width="50" height="50" viewBox="0 0 122.88 119.19" fill="A9FB1A " xmlns="http://www.w3.org/2000/svg"><path class="cls-1" d="M104.84,1.62,121.25,18a5.58,5.58,0,0,1,0,7.88L112.17,35l-24.3-24.3L97,1.62a5.6,5.6,0,0,1,7.88,0ZM31.26,3.43h36.3L51.12,19.87H31.26A14.75,14.75,0,0,0,20.8,24.2l0,0a14.75,14.75,0,0,0-4.33,10.46v68.07H84.5A14.78,14.78,0,0,0,95,98.43l0,0a14.78,14.78,0,0,0,4.33-10.47V75.29l16.44-16.44V87.93A31.22,31.22,0,0,1,106.59,110l0,.05a31.2,31.2,0,0,1-22,9.15h-72a12.5,12.5,0,0,1-8.83-3.67l0,0A12.51,12.51,0,0,1,0,106.65v-72a31.15,31.15,0,0,1,9.18-22l.05-.05a31.17,31.17,0,0,1,22-9.16ZM72.33,74.8,52.6,80.9c-13.85,3-13.73,6.15-11.16-6.91l6.64-23.44h0l0,0L83.27,15.31l24.3,24.3L72.35,74.83l0,0ZM52.22,54.7l16,16-13,4c-10.15,3.13-10.1,5.22-7.34-4.55l4.34-15.4Z" fill="%23A9FB1A"/></svg>'); 
                position: absolute;
                top: 52.5%;
                left: 52.5%;
                transform: translate(-50%, -50%);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none; 
            }
            .image-container:hover::after {
                opacity: 1;
            }
            `}
      </style>
      <div className="block lg:hidden">
        <NavigationBar dark={dark}></NavigationBar>
      </div>
      <span className="header-background grid h-[100%] w-[100%] auto-rows-min grid-cols-pr">
        <div className="fixed left-0 z-50 col-span-1 w-[100%] min-w-[90px] max-w-[90px] bg-sp-purple pr-[1px]">
          <DropdownMin link={user.id}></DropdownMin>
        </div>
        <span className="z-10 col-start-1 col-end-13 h-[100%] w-[100%] lg:col-start-2">
          <span className="grid h-full w-full auto-rows-auto grid-cols-12">
            {ownerPage && (
              <>
                <div className="image-container col-start-1 col-end-13 row-start-1 row-end-2 h-full max-h-[35vh] sm:min-h-[35vh] lg:row-start-1 lg:row-end-5">
                  <img
                    className="hidden h-[100%] max-h-max w-[100%] cursor-pointer object-cover"
                    src={`${bannerImage}`}
                    alt=""
                    onClick={() =>
                      document.getElementById("banner-upload")?.click()
                    }
                  />
                  <input
                    type="file"
                    id="banner-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, "banner")}
                  />
                </div>
                <div className="image-container relative z-10 col-start-1 col-end-6 row-start-2 w-full place-self-end self-center justify-self-start sm:row-start-1 sm:row-end-7 sm:self-end md:col-start-1 md:col-end-5  lg:col-start-2 lg:col-end-5">
                  <img
                    className="aspect-square w-full rounded-[20px] border-[6px] border-solid border-sp-purpleBright2 object-cover p-[5px] hover:border-[6px]"
                    src={`${profileImage}`}
                    alt="Profile"
                    onClick={() =>
                      document.getElementById("profile-upload")?.click()
                    }
                  />
                  <input
                    type="file"
                    id="profile-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, "icon")}
                  />
                </div>
              </>
            )}
            {!ownerPage && (
              <>
                <div className="col-start-1 col-end-13 row-start-1 row-end-2 h-full max-h-[35vh] sm:min-h-[35vh] lg:row-start-1 lg:row-end-5">
                  <img
                    className="h-[100%] max-h-max w-[100%] object-cover"
                    src={`${bannerImage}`}
                    alt="BannerImage"
                  />
                </div>
                <div className="image-container relative z-10 col-start-1 col-end-6 row-start-2 w-full place-self-end self-center justify-self-start sm:row-start-1 sm:row-end-7 sm:self-end md:col-start-1 md:col-end-5  lg:col-start-2 lg:col-end-5">
                  <img
                    className="aspect-square w-full rounded-[20px] border-[6px] border-solid border-sp-purpleBright2 object-cover p-[5px] hover:border-[6px]"
                    src={`${profileImage}`}
                    alt="ProfileImage"
                  />
                </div>
              </>
            )}
            <div className="col-span-9 col-start-6 row-start-2 min-h-[170px] rounded-[20px] pt-3 sm:row-start-5 md:col-start-6 md:col-end-13 lg:col-end-12 ">
              <div className="grid-cols-auto grid h-[100%] w-[100%] auto-rows-min content-center rounded-[20px] bg-black bg-opacity-40 text-white">
                <div className="col-span-2 lg:row-start-2">
                  <InfoUser
                    dark={dark}
                    numberLocalFollowing={followingsNumber}
                    admin={ownerPage}
                    description={
                      user.description === null
                        ? "Insert bio here"
                        : user.description
                    }
                    id={user.id}
                    name={user.name}
                    isfollow={isFollowed}
                  ></InfoUser>
                </div>
                {ownerPage && (
                  <div className="col-end-4 flex flex-row items-center justify-center align-middle sm:flex sm:justify-start sm:px-4 sm:py-4 md:flex md:justify-center md:align-middle lg:col-start-3 lg:row-start-2 lg:flex lg:justify-end">
                    <ConfigButton user={user.id}></ConfigButton>
                  </div>
                )}
                {!ownerPage && (
                  <div className="col-end-4 flex flex-row items-center justify-center align-middle sm:flex sm:justify-start sm:px-4 sm:py-4 md:flex md:justify-center md:align-middle lg:col-start-3 lg:row-start-2 lg:flex lg:justify-end">
                    <FollowButton
                      followState={isFollowed}
                      handleFollow={handleFollow}
                      handleUnfollow={handleUnfollow}
                    ></FollowButton>
                  </div>
                )}
              </div>
            </div>
            <div className="row-start-8 row-end-9 col-start-1 col-end-13 mb-5 mt-5 grid w-[100%] auto-rows-auto  grid-cols-12 rounded-[20px] bg-black bg-opacity-40 pb-5 font-semibold text-white lg:col-start-2 lg:col-end-12">
              <Tabs searchValue={search} setSearch={setSearch}></Tabs>

              {search === 1 &&
                data &&
                data.pages[0]?.allPosts.length > 0 &&
                data?.pages.map((page, index) => (
                  <div
                    key={index}
                    className="col-start-1 col-end-13 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11"
                  >
                    {page.allPosts.map((post: Posts) => (
                      <div className="\" key={post.id}>
                        <CommunityPostSecond
                          dark={false}
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
                          likes={post.likes}
                          comments={post.comments}
                          //
                          likedPosts={likedPosts}
                          setLikedPosts={setLikedPosts}
                          //blocks
                          blockedUsers={blocked}
                          setBlockedUsers={setBlocked}
                          //saved
                          savedUsers={saved}
                          setSavedUsers={setSaved}
                          //user
                          userID={user.id}
                        ></CommunityPostSecond>
                      </div>
                    ))}
                  </div>
                ))}
              {search === 1 &&
                isAdmin &&
                saved &&
                (saved.length > 0 ? (
                  <div className="col-start-1 col-end-13 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11">
                    {saved.map((post: Posts) => (
                      <div className="\" key={post.id}>
                        <CommunityPostSecond
                          dark={false}
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
                          blockedUsers={[]}
                          likes={Number(post.likes)}
                          comments={Number(post.comments)}
                          //
                          savedUsers={saved}
                          setSavedUsers={setSaved}
                          //
                          likedPosts={likedPosts}
                          setLikedPosts={setLikedPosts}
                          userID={user.id} //
                        ></CommunityPostSecond>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                    <NoResults dark={true}></NoResults>
                  </div>
                ))}
              {search === 2 &&
                data &&
                data.pages[0]?.allPosts.length > 0 &&
                data?.pages.map((page, index) => (
                  <div
                    key={index}
                    className="col-start-1 col-end-13 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11"
                  >
                    {page.allPosts.map((post: Posts) => (
                      <div className="\" key={post.id}>
                        <CommunityPostSecond
                          dark={false}
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
                          //
                          likedPosts={likedPosts}
                          setLikedPosts={setLikedPosts}
                          //blocks
                          blockedUsers={blocked}
                          setBlockedUsers={setBlocked}
                          //saved
                          savedUsers={saved}
                          setSavedUsers={setSaved}
                          //user
                          userID={user.id}
                        ></CommunityPostSecond>
                      </div>
                    ))}
                  </div>
                ))}
              {search === 2 &&
                isAdmin &&
                userPosts &&
                (userPosts.length > 0 ? (
                  <div className="col-start-1 col-end-13 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11">
                    {userPosts.map((post: Posts) => (
                      <div className="\" key={post.id}>
                        <CommunityPostSecond
                          dark={false}
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
                          blockedUsers={[]}
                          likes={Number(post.likes)}
                          comments={Number(post.comments)}
                          //
                          savedUsers={saved}
                          setSavedUsers={setSaved}
                          //
                          likedPosts={likedPosts}
                          setLikedPosts={setLikedPosts}
                          userID={user.id}
                        ></CommunityPostSecond>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                    <NoResults dark={true}></NoResults>
                  </div>
                ))}
              {search === 3 &&
                data &&
                data.pages[0]?.allPosts.length > 0 &&
                data?.pages.map((page, index) => (
                  <div
                    key={index}
                    className="col-start-1 col-end-13 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11"
                  >
                    {page.allPosts.map((post: Posts) => (
                      <div className="\" key={post.id}>
                        <CommunityPostSecond
                          dark={false}
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
                          likes={post.likes}
                          comments={post.comments}
                          //
                          likedPosts={likedPosts}
                          setLikedPosts={setLikedPosts}
                          //blocks
                          blockedUsers={blocked}
                          setBlockedUsers={setBlocked}
                          //saved
                          savedUsers={saved}
                          setSavedUsers={setSaved}
                          //user
                          userID={user.id}
                        ></CommunityPostSecond>
                      </div>
                    ))}
                  </div>
                ))}
              {search === 3 &&
                isAdmin &&
                likedPosts &&
                (likedPosts.length > 0 ? (
                  <div className="col-start-1 col-end-13 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11">
                    {saved.map((post: Posts) => (
                      <div className="\" key={post.id}>
                        <CommunityPostSecond
                          dark={false}
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
                          likes={post.likes}
                          comments={post.comments}
                          //
                          likedPosts={likedPosts}
                          setLikedPosts={setLikedPosts}
                          //blocks
                          blockedUsers={blocked}
                          setBlockedUsers={setBlocked}
                          //saved
                          savedUsers={saved}
                          setSavedUsers={setSaved}
                          //user
                          userID={user.id}
                        ></CommunityPostSecond>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                    <NoResults dark={true}></NoResults>
                  </div>
                ))}
              {search === 4 &&
                data &&
                data.pages[0]?.allPosts.length > 0 &&
                data.pages.map((page, index) => (
                  <div
                    key={index}
                    className="col-start-3 col-end-11 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11"
                  >
                    {commentsFinal.length > 0 ? (
                      commentsFinal.map((comments) => (
                        <CommentsItems
                          userComments={[]}
                          outsidePost={true}
                          dark={true}
                          likedComments={likedComments}
                          setLikedCommments={setLikedComments}
                          key={comments.id}
                          comment={comments}
                        />
                      ))
                    ) : (
                      <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                        <NoResults dark={true}></NoResults>
                      </div>
                    )}
                  </div>
                ))}
              {search === 4 &&
                isAdmin &&
                comments &&
                likedComments &&
                (commentsFinal.length > 0 ? (
                  <div className="col-start-3  col-end-11 row-start-2 mt-4 h-full pt-5 lg:col-start-3 lg:col-end-11">
                    {commentsFinal.map((comments, index) => (
                      <CommentsItems
                        userComments={[]}
                        outsidePost={true}
                        dark={true}
                        likedComments={likedComments}
                        setLikedCommments={setLikedComments}
                        key={index}
                        comment={comments}
                      ></CommentsItems>
                    ))}
                  </div>
                ) : (
                  <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                    <NoResults dark={true}></NoResults>
                  </div>
                ))}
              {data && data.pages[0]?.allPosts.length == 0 && !isAdmin && (
                <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                  <NoResults dark={true}></NoResults>
                </div>
              )}
              {isLoading && (
                <div className="col-start-2 col-end-12 row-start-2 mt-4 h-[60vh]">
                  <div className="z-99 fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.01]">
                    <LoadingPage></LoadingPage>
                  </div>
                </div>
              )}
            </div>
          </span>
        </span>
        <DropdownMin link={user.id}></DropdownMin>
      </span>
    </>
  );
};

export default PageLayout;
