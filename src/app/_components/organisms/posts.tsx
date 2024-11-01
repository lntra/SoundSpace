"use client";

import { api } from "~/trpc/react";
import LoadingPage from "./loadingPage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type UUID } from "crypto";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import CommunityPostSecond from "../molecules/communityPostSecond";
import RejectedPage from "./rejectedPage";
import { type Communities, type Posts as PostsType } from "~/lib/definitions";
import useSessionData from "~/app/hooks/useSessionData";

dayjs.extend(relativeTime);

interface Blocked {
  userId: UUID;
}

interface Saved {
  postId: UUID;
}

interface PostsProps {
  id?: UUID;
  tags: string;
  tagsState: (tagText: string) => void;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  forYouRoute?: boolean;
  dark: boolean;
}

const getLikedPosts = (): string[] => {
  const storedLikes = localStorage.getItem("likedPosts");
  return storedLikes ? JSON.parse(storedLikes) : [];
};

const getCurrentBlocked = (): Blocked[] => {
  const storedBlocked = localStorage.getItem("userBlocked");
  return storedBlocked ? JSON.parse(storedBlocked) : [];
};

const getCurrentSaved = (): PostsType[] => {
  const storedSaved = localStorage.getItem("userSaved");
  return storedSaved ? JSON.parse(storedSaved) : [];
};

const getCurrentPosts = (): PostsType[] => {
  const storedPosts = localStorage.getItem("userPosts");
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const getFollowedCommunities = (): Communities[] => {
  const storedFollowedCommunities = localStorage.getItem("followedCommunities");
  return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const Posts: React.FC<PostsProps> = ({
  forYouRoute,
  search,
  setSearch,
  id,
  tags,
  tagsState,
  dark,
}) => {
  const [likedPosts, setLikedPosts] = useState<string[]>(() => getLikedPosts());
  const [blocked, setBlocked] = useState<Blocked[]>(getCurrentBlocked);
  const [saved, setSaved] = useState<PostsType[]>(getCurrentSaved);
  const [userPosts, setuserPosts] = useState<PostsType[]>(getCurrentPosts());
  const [localFollowing, setLocalFollowing] = useState<Communities[]>(() =>
    getFollowedCommunities(),
  );

  const [refresh, setRefresh] = useState<boolean>(false);

  const { data: UserData } = useSessionData();

  const fetchPosts =
    id !== undefined
      ? api.posts.getPostsByIDInfinite.useInfiniteQuery(
          {
            communityId: id as string,
            tags: tags !== "" ? tags : undefined,
            route: search,
          },
          {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            queryKey: [
              "posts.getPostsByIDInfinite",
              {
                route: search,
                tags: tags !== "" ? tags : undefined,
                communityId: id as string,
              },
            ],
          },
        )
      : api.posts.getAllPosts.useInfiniteQuery(
          {
            tags: tags !== "" ? tags : undefined,
            route: search,
          },
          {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            queryKey: [
              "posts.getAllPosts",
              { route: search, tags: tags !== "" ? tags : undefined },
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

      if (id !== undefined) {
        let mergedPosts = [
          ...userPosts.filter((posts: PostsType) => posts.community_id === id),
          ...serverPosts,
        ];

        mergedPosts = Array.from(
          new Map(mergedPosts.map((post) => [post.id, post])).values(),
        );

        mergedPosts = mergedPosts.filter(
          (post: PostsType) =>
            post.id !== "d1adf5ec-c0af-4608-8aa2-72c0f9228312",
        );

        if (mergedPosts.length < 1) {
          setSearch("Top Rated");
          return;
        }

        switch (search) {
          case "Trending":
            const now = new Date();
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(now.getDate() - 14);

            const recentPosts = mergedPosts.filter(
              (post: PostsType) => new Date(post.created_at) >= fourteenDaysAgo,
            );
            const olderPosts = mergedPosts.filter(
              (post: PostsType) => new Date(post.created_at) < fourteenDaysAgo,
            );

            recentPosts.sort(
              (a: PostsType, b: PostsType) => (b.likes || 0) - (a.likes || 0),
            );
            olderPosts.sort(
              (a: PostsType, b: PostsType) => (b.likes || 0) - (a.likes || 0),
            );

            const finalPosts = [...recentPosts, ...olderPosts];

            setuserPosts(finalPosts);
            break;
          case "Hot Topics":
            mergedPosts.sort(
              (a: PostsType, b: PostsType) =>
                (b.comments || 0) - (a.comments || 0),
            );
            setuserPosts(mergedPosts);
            break;
          case "Recent":
            console.log(mergedPosts);
            mergedPosts.sort(
              (a: PostsType, b: PostsType) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            );
            setuserPosts(mergedPosts);
            break;
          case "Top Rated":
            mergedPosts.sort(
              (a: PostsType, b: PostsType) => (b.likes || 0) - (a.likes || 0),
            );
            setuserPosts(mergedPosts);
            break;
        }

        if (blocked.length > 0) {
          const blockedUserIds = blocked.map((user: Blocked) => user.userId);

          console.log(blockedUserIds);

          console.log(mergedPosts);

          mergedPosts = mergedPosts.filter(
            (post: PostsType) => !blockedUserIds.includes(post.user_id),
          );

          console.log(mergedPosts);
        }
      } else {
        let mergedPosts = [...userPosts, ...serverPosts];

        mergedPosts = Array.from(
          new Map(mergedPosts.map((post) => [post.id, post])).values(),
        );

        mergedPosts = mergedPosts.filter(
          (post: PostsType) =>
            post.id !== "d1adf5ec-c0af-4608-8aa2-72c0f9228312",
        );

        if (mergedPosts.length < 1) {
          setSearch("Top Rated");
          return;
        }

        switch (search) {
          case "Trending":
            const now = new Date();
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(now.getDate() - 14);

            const recentPosts = mergedPosts.filter(
              (post: PostsType) => new Date(post.created_at) >= fourteenDaysAgo,
            );
            const olderPosts = mergedPosts.filter(
              (post: PostsType) => new Date(post.created_at) < fourteenDaysAgo,
            );

            recentPosts.sort(
              (a: PostsType, b: PostsType) => (b.likes || 0) - (a.likes || 0),
            );
            olderPosts.sort(
              (a: PostsType, b: PostsType) => (b.likes || 0) - (a.likes || 0),
            );

            const finalPosts = [...recentPosts, ...olderPosts];

            setuserPosts(finalPosts);
            break;
          case "Hot Topics":
            mergedPosts.sort(
              (a: PostsType, b: PostsType) =>
                (b.comments || 0) - (a.comments || 0),
            );
            setuserPosts(mergedPosts);
            break;
          case "Recent":
            console.log(mergedPosts);
            mergedPosts.sort(
              (a: PostsType, b: PostsType) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            );
            setuserPosts(mergedPosts);
            break;
          case "Top Rated":
            mergedPosts.sort(
              (a: PostsType, b: PostsType) => (b.likes || 0) - (a.likes || 0),
            );
            setuserPosts(mergedPosts);
            break;
        }

        if (blocked.length > 0) {
          const blockedUserIds = blocked.map((user: Blocked) => user.userId);

          console.log(blockedUserIds);

          console.log(mergedPosts);

          mergedPosts = mergedPosts.filter(
            (post: PostsType) => !blockedUserIds.includes(post.user_id),
          );

          console.log(mergedPosts);

          setuserPosts(mergedPosts);
        }

        if (forYouRoute) {
          const followedCommunities = localFollowing.map(
            (community: Communities) => community.id,
          );

          console.log(followedCommunities);

          mergedPosts = mergedPosts.filter((post: PostsType) =>
            followedCommunities.includes(post.community_id),
          );

          setuserPosts(mergedPosts);
        }
      }
    }
  }, [data, search, forYouRoute, refresh]);

  const handleDelete = (tagText: string) => {
    const localData = JSON.parse(localStorage.getItem("userPosts") || "[]");
    const existe = localData.filter((post: PostsType) => post.id !== tagText);
    localStorage.setItem("userPosts", JSON.stringify(existe));

    const localSaved = JSON.parse(localStorage.getItem("userSaved") || "[]");
    const existeSaved = localSaved.filter(
      (post: PostsType) => post.id !== tagText,
    );
    localStorage.setItem("userPosts", JSON.stringify(existeSaved));

    const localLiked = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    const existeLikes = localLiked.filter(
      (post: PostsType) => post.id !== tagText,
    );
    localStorage.setItem("userPosts", JSON.stringify(existeLikes));

    const localComments = JSON.parse(
      localStorage.getItem("userComments") || "[]",
    );
    const existeComments = localComments.filter(
      (post: PostsType) => post.id !== tagText,
    );
    localStorage.setItem("userPosts", JSON.stringify(existeComments));
  };

  const handleTagClick = (tagText: string) => {
    tagsState(tagText);
  };

  const handleFetchMore = () => {
    console.log(hasNextPage);
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("oi");
        handleFetchMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="h-[100vh]">
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
      <div className="min-h-screen w-[100%]">
        <div>
          {userPosts.map((post: PostsType) => (
            <div key={post.id}>
              <CommunityPostSecond
                //style
                dark={dark}
                //post
                post={post}
                handleDelete={handleDelete}
                //view
                title={post.content}
                content={post.content_post}
                date={post.created_at}
                user_id={post.user_id}
                post_id={post.id}
                community_id={post.community_id}
                url_image={post.url_image}
                tags={post.tags}
                onTagClick={handleTagClick}
                //joins
                user_name={post.user_name}
                community_name={post.community_name}
                community_icon={post.community_icon}
                likes={post.likes}
                comments={post.comments}
                //likes
                likedPosts={likedPosts}
                setLikedPosts={setLikedPosts}
                //blocks
                blockedUsers={blocked}
                setBlockedUsers={setBlocked}
                //saved
                savedUsers={saved}
                setSavedUsers={setSaved}
                //refresh
                refresh={refresh}
                setRefresh={setRefresh}
                //user
                userID={UserData?.user.id as UUID}
              ></CommunityPostSecond>
            </div>
          ))}
        </div>
      </div>
      {isLoading && <LoadingPage></LoadingPage>}
    </>
  );
};

export default Posts;
