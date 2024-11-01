import BarComments from "./barComments";
import BarInvisible from "./barInvisible";
import BarHeart from "./barHeart";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UUID } from "crypto";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link";
import { number } from "zod";
import TextAreaComentario from "./textAreaComentario";
import useSessionData from "~/app/hooks/useSessionData";
import { Comments } from "~/lib/definitions";

dayjs.extend(relativeTime);

interface CommentsProps {
    commentID: UUID;
    userID : UUID;
    postId: UUID;
    createdAt : Date;
    content : string;
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
    dark : boolean;
    userComments: Comments[];
    setUserComments?: Dispatch<SetStateAction<Comments[]>>;
}

const CommentsView : React.FC<CommentsProps> = ( {userComments, setUserComments, dark, commentID, likedState, handleLiked, handleUnliked, postId, likes , outsidePost, userName, userImage, userID , createdAt, content, hidden, onHide, alternateStyle} ) => {
    const [stateHeart, setStateHeart] = useState(likedState ? (dark ? '#53337B' : '#53337B') : '')
    const [userImageURL, setUserImageURL] = useState("https://via.placeholder.com/32x32")

    const { data, isLoading, error } = useSessionData();

    useEffect(() => {
        if(userImage !== "" && userImage !== undefined){
            if(userImage === "set"){
                const localUser = localStorage.getItem("profileImage")
                if(localUser){
                    setUserImageURL(localUser)
                }
                return;
            }
            setUserImageURL(userImage)
        }
    },[userImage])

    useEffect(() => {
        setStateHeart(likedState ? (dark ? '#53337B' : '#53337B') : '')
    },[likedState])

    const [started, setStarted] = useState(false)
    const [parent_id, setParent_id] = useState(commentID)

    const handleReply = () => {
        setStarted(!started)
    }

    return (
        <>
            {outsidePost && (
                <Link href={`/pages/community/post/${postId}`} style={{ display: hidden }} className={`${dark ? "bg-white text-black" : "bg-white text-black"} w-full py-3 px-5 rounded-[20px] border border-sp-purpleBright2 ${alternateStyle? "bg-white text-black mt-5"  : "bg-white text-black mt-5"} grid grid-cols-[40px_1fr] gap-x-3 grid-rows-auto my-2`}>
                    <div className="row-start-1 row-end-1 col-start-1 col-end-2 flex items-center w-[40px]">
                        <img className="w-10 h-10 object-cover rounded-full border border-sp-purpleBright2" src={`${userImageURL}`} alt="User Avatar" />
                    </div>
                    <div className="row-start-1 row-end-1 col-start-2 col-end-3 flex items-center">
                        <div>
                            <span className="text-base font-bold font-['Lato']">{userName}</span>
                            <span className="text-base font-bold font-['Lato']"> - {dayjs(createdAt).fromNow()}</span>
                        </div>
                    </div>
                    {!likedState && (
                        <div onClick={handleLiked} className="row-start-2 row-end-2 col-start-1 col-end-2 flex flex-wrap flex-col items-center justify-center w-[40px]">
                            <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : "#53337B"} />
                            <p className="text-sm font-semibold">{likes}</p>
                        </div>
                    )}
                    {!!likedState && (
                        <div onClick={handleUnliked} className="row-start-2 row-end-2 col-start-1 col-end-2 flex flex-wrap flex-col items-center justify-center w-[40px]">
                            <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : "#53337B"} />
                            <p className="text-sm font-semibold">{((Number(likes)) + 1)}</p>
                        </div>
                    )}
                    <div className="row-start-2 row-end-2 col-start-2 col-end-3 flex items-center">
                        <div className={`w-full min-w-full max-w-fit ${dark ? "text-black" : "text-black"} text-lg font-normal font-['Lato']`}>
                            {content}
                        </div>
                    </div>
                </Link>
            )}
            {!outsidePost && (
                <div style={{ display: hidden }} className={`w-full py-3 px-5 rounded-[20px] border border-sp-purpleBright2 ${alternateStyle? "bg-white text-black mt-5" : "bg-white text-black mt-5"} grid grid-cols-[40px_1fr] gap-x-3 grid-rows-auto my-2`}>
                    <Link href={`/pages/profile/${userID}`} className="row-start-1 row-end-1 col-start-1 col-end-2 flex items-center w-[40px]">
                        <img className="w-10 h-10 object-cover rounded-full border border-sp-purpleBright2" src={`${userImageURL}`} alt="User Avatar" />
                    </Link>
                    <Link href={`/pages/profile/${userID}`} className="row-start-1 row-end-1 col-start-2 col-end-3 flex items-center">
                        <div>
                            <span className="text-base font-bold font-['Lato']">{userName}</span>
                            <span className="text-base font-semibold font-['Lato']"> - {dayjs(createdAt).fromNow()}</span>
                        </div>
                    </Link>
                    {!likedState && (
                        <div onClick={handleLiked} className="row-start-2 row-end-2 col-start-1 col-end-2 flex flex-wrap flex-col items-center justify-center w-[40px]">
                            <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : "#53337B"} />
                            <p className="text-sm font-semibold">{likes}</p>
                        </div>
                    )}
                    {!!likedState && (
                        <div onClick={handleUnliked} className="row-start-2 row-end-2 col-start-1 col-end-2 flex flex-wrap flex-col items-center justify-center w-[40px]">
                            <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : "#53337B"} />
                            <p className="text-sm font-semibold">{((Number(likes)) + 1)}</p>
                        </div>
                    )}
                    <div className="row-start-2 row-end-2 col-start-2 col-end-3 flex items-center">
                        <div className={`w-full min-w-full max-w-fit text-lg font-normal font-['Lato']`}>
                            {content}
                        </div>
                    </div>
                        { !alternateStyle &&
                            <div className="row-start-3 row-end-3 col-start-2 col-end-3 flex items-center mt-1">
                                <div onClick={handleReply} className="flex items-center mx-1">
                                    <BarComments color="#6C7871" />
                                    <p className="text-sm text-stone-500 font-semibold">Reply</p>
                                </div>
                                <div onClick={onHide} className="flex items-center mx-1">
                                    <BarInvisible color="#6C7871" />
                                    <p className="text-sm text-stone-500 font-semibold">Hide</p>
                                </div>
                            </div>
                        }
                </div>
        )}
            {started && data && (
                <div>
                    <TextAreaComentario userComments={userComments} setUserComments={setUserComments} dark={dark} setStarted={setStarted} started={started} parent_id={parent_id} post_id={postId} user_id={data.user.id as UUID} user_name={data.user.name as string} user_icon={data.user.url_icon as string}></TextAreaComentario>
                </div>
            )}
        </>
    );
}

export default CommentsView;
