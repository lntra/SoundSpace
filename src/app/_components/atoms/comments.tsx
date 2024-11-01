import BarComments from "./barComments";
import BarInvisible from "./barInvisible";
import BarHeart from "./barHeart";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type UUID } from "crypto";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import TextAreaComentario from "./textAreaComentario";
import useSessionData from "~/app/hooks/useSessionData";
import { type Comments } from "~/lib/definitions";

dayjs.extend(relativeTime);

interface CommentsProps {
  commentID: UUID;
  userID: UUID;
  postId: UUID;
  createdAt: Date;
  content: string;
  hidden?: string;
  onHide?: () => void;
  alternateStyle?: boolean;
  userImage?: string;
  userName?: string;
  outsidePost?: boolean;
  likes?: number;
  likedState: boolean;
  handleLiked: () => void;
  handleUnliked: () => void;
  dark: boolean;
  userComments: Comments[];
  setUserComments?: Dispatch<SetStateAction<Comments[]>>;
}

const CommentsView: React.FC<CommentsProps> = ({
  userComments,
  setUserComments,
  dark,
  commentID,
  likedState,
  handleLiked,
  handleUnliked,
  postId,
  likes,
  outsidePost,
  userName,
  userImage,
  userID,
  createdAt,
  content,
  hidden,
  onHide,
  alternateStyle,
}) => {
  const [stateHeart, setStateHeart] = useState(
    likedState ? (dark ? "#53337B" : "#53337B") : "",
  );
  const [userImageURL, setUserImageURL] = useState(
    "https://via.placeholder.com/32x32",
  );

  const { data, isLoading, error } = useSessionData();

  useEffect(() => {
    if (userImage !== "" && userImage !== undefined) {
      if (userImage === "set") {
        const localUser = localStorage.getItem("profileImage");
        if (localUser) {
          setUserImageURL(localUser);
        }
        return;
      }
      setUserImageURL(userImage);
    }
  }, [userImage]);

  useEffect(() => {
    setStateHeart(likedState ? (dark ? "#53337B" : "#53337B") : "");
  }, [likedState]);

  const [started, setStarted] = useState(false);
  const [parent_id, setParent_id] = useState(commentID);

  const handleReply = () => {
    setStarted(!started);
  };

  return (
    <>
      {outsidePost && (
        <Link
          href={`/pages/community/post/${postId}`}
          style={{ display: hidden }}
          className={`${
            dark ? "bg-white text-black" : "bg-white text-black"
          } w-full rounded-[20px] border border-sp-purpleBright2 px-5 py-3 ${
            alternateStyle
              ? "mt-5 bg-white text-black"
              : "mt-5 bg-white text-black"
          } grid-rows-auto my-2 grid grid-cols-[40px_1fr] gap-x-3`}
        >
          <div className="col-start-1 col-end-2 row-start-1 row-end-1 flex w-[40px] items-center">
            <img
              className="h-10 w-10 rounded-full border border-sp-purpleBright2 object-cover"
              src={`${userImageURL}`}
              alt="User Avatar"
            />
          </div>
          <div className="col-start-2 col-end-3 row-start-1 row-end-1 flex items-center">
            <div>
              <span className="font-['Lato'] text-base font-bold">
                {userName}
              </span>
              <span className="font-['Lato'] text-base font-bold">
                {" "}
                - {dayjs(createdAt).fromNow()}
              </span>
            </div>
          </div>
          {!likedState && (
            <div
              onClick={handleLiked}
              className="col-start-1 col-end-2 row-start-2 row-end-2 flex w-[40px] flex-col flex-wrap items-center justify-center"
            >
              <BarHeart
                pressed={stateHeart}
                color={stateHeart != "" ? "" : "#53337B"}
              />
              <p className="text-sm font-semibold">{likes}</p>
            </div>
          )}
          {!!likedState && (
            <div
              onClick={handleUnliked}
              className="col-start-1 col-end-2 row-start-2 row-end-2 flex w-[40px] flex-col flex-wrap items-center justify-center"
            >
              <BarHeart
                pressed={stateHeart}
                color={stateHeart != "" ? "" : "#53337B"}
              />
              <p className="text-sm font-semibold">{Number(likes) + 1}</p>
            </div>
          )}
          <div className="col-start-2 col-end-3 row-start-2 row-end-2 flex items-center">
            <div
              className={`w-full min-w-full max-w-fit ${
                dark ? "text-black" : "text-black"
              } font-['Lato'] text-lg font-normal`}
            >
              {content}
            </div>
          </div>
        </Link>
      )}
      {!outsidePost && (
        <div
          style={{ display: hidden }}
          className={`w-full rounded-[20px] border border-sp-purpleBright2 px-5 py-3 ${
            alternateStyle
              ? "mt-5 bg-white text-black"
              : "mt-5 bg-white text-black"
          } grid-rows-auto my-2 grid grid-cols-[40px_1fr] gap-x-3`}
        >
          <Link
            href={`/pages/profile/${userID}`}
            className="col-start-1 col-end-2 row-start-1 row-end-1 flex w-[40px] items-center"
          >
            <img
              className="h-10 w-10 rounded-full border border-sp-purpleBright2 object-cover"
              src={`${userImageURL}`}
              alt="User Avatar"
            />
          </Link>
          <Link
            href={`/pages/profile/${userID}`}
            className="col-start-2 col-end-3 row-start-1 row-end-1 flex items-center"
          >
            <div>
              <span className="font-['Lato'] text-base font-bold">
                {userName}
              </span>
              <span className="font-['Lato'] text-base font-semibold">
                {" "}
                - {dayjs(createdAt).fromNow()}
              </span>
            </div>
          </Link>
          {!likedState && (
            <div
              onClick={handleLiked}
              className="col-start-1 col-end-2 row-start-2 row-end-2 flex w-[40px] flex-col flex-wrap items-center justify-center"
            >
              <BarHeart
                pressed={stateHeart}
                color={stateHeart != "" ? "" : "#53337B"}
              />
              <p className="text-sm font-semibold">{likes}</p>
            </div>
          )}
          {!!likedState && (
            <div
              onClick={handleUnliked}
              className="col-start-1 col-end-2 row-start-2 row-end-2 flex w-[40px] flex-col flex-wrap items-center justify-center"
            >
              <BarHeart
                pressed={stateHeart}
                color={stateHeart != "" ? "" : "#53337B"}
              />
              <p className="text-sm font-semibold">{Number(likes) + 1}</p>
            </div>
          )}
          <div className="col-start-2 col-end-3 row-start-2 row-end-2 flex items-center">
            <div
              className={`w-full min-w-full max-w-fit font-['Lato'] text-lg font-normal`}
            >
              {content}
            </div>
          </div>
          {!alternateStyle && (
            <div className="col-start-2 col-end-3 row-start-3 row-end-3 mt-1 flex items-center">
              <div onClick={handleReply} className="mx-1 flex items-center">
                <BarComments color="#6C7871" />
                <p className="text-sm font-semibold text-stone-500">Reply</p>
              </div>
              <div onClick={onHide} className="mx-1 flex items-center">
                <BarInvisible color="#6C7871" />
                <p className="text-sm font-semibold text-stone-500">Hide</p>
              </div>
            </div>
          )}
        </div>
      )}
      {started && data && (
        <div>
          <TextAreaComentario
            userComments={userComments}
            setUserComments={setUserComments}
            dark={dark}
            setStarted={setStarted}
            started={started}
            parent_id={parent_id}
            post_id={postId}
            user_id={data.user.id as UUID}
            user_name={data.user.name as string}
            user_icon={data.user.url_icon as string}
          ></TextAreaComentario>
        </div>
      )}
    </>
  );
};

export default CommentsView;
