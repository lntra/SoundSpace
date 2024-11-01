import { UUID } from "crypto";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Avaliacao from "./avaliacao";
import Tag from "../atoms/tag";
import BarDotsBlack from "../atoms/barDotsBlack";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Posts  } from "~/lib/definitions"

dayjs.extend(relativeTime);

interface Blocked {
    userId : UUID,
    userName ?: string
}

interface Saved {
    postId : UUID
}

interface CommunityPostSecondProps {
    //post
    post:Posts
    //view
    color?: string;
    pressed?: string;
    title: string;
    content?: string;
    date: Date;
    user_id: UUID;
    post_id: UUID;
    community_id: UUID;
    url_image? : string;
    tags? : string[];
    onTagClick? : (tag : string) => void;
    optionalStyle?: boolean;
    //joins
    user_name: string; 
    community_name: string;
    community_icon? : string;
    likes? : number;
    comments? : number;
    //likestate
    likedPosts : string[];
    setLikedPosts : Dispatch<SetStateAction<string[]>>;
    //blockstate 
    blockedUsers : Blocked[];
    setBlockedUsers ?: Dispatch<SetStateAction<Blocked[]>>;
    // savestate
    savedUsers : Posts[];
    setSavedUsers : Dispatch<SetStateAction<Posts[]>>;
    // refresh
    refresh?: boolean;
    setRefresh?: Dispatch<SetStateAction<boolean>>;
    // posts
    handleDelete: (tagText: string) => void;
    // user
    userID : UUID;
    // style
    dark : boolean
}

const CommunityPostSecond: React.FC<CommunityPostSecondProps> = ( {post, userID , handleDelete, refresh, setRefresh, blockedUsers, savedUsers, setSavedUsers, setBlockedUsers, likedPosts, setLikedPosts, likes, comments, optionalStyle ,title, content, date, user_id, post_id, community_id, user_name, community_name, url_image, tags, community_icon, onTagClick, dark} ) => {
    //Setting up if the post is already liked
    const [isLiked , setIsLiked] = useState(likedPosts.includes(post_id))
     //Setting up likes number to be able to change state
    const [postlikes, setLikes] = useState<number>((isLiked ? ((Number(likes)) + 1) : Number(likes || 0)))

    useEffect(() => {
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    },[likedPosts])

    const handleLiked = () => {
        if (!isLiked) {
            setLikedPosts((e) => [...e, post_id]);
            setLikes((e) => e + 1)
            setIsLiked(true)
        }
    };

    const isAuthor = (user_id === userID)

    const handleClickSelect = (e: string) => {
        
        switch (e) {
            case "Block" : {
                console.log(1);
                if(setBlockedUsers && setRefresh) {
                    setBlockedUsers([...blockedUsers, {userId : user_id, userName: user_name} ])
                    setRefresh(!refresh)
                }
                break;
            }
            case "Save" : {
                console.log(2)
                if(!savedUsers.some((savedPost : Posts) => savedPost.id === post.id)){
                    setSavedUsers([...savedUsers, post ])
                }
                break;
            }
            case "Delete" : {
                handleDelete(post_id)
                if(setRefresh)
                setRefresh(!refresh)
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
            setLikedPosts((e) => e.filter(likedPost => likedPost !== post_id)); 
            setLikes((e) => e - 1)
            setIsLiked(false)
        }
    };
    
    return <>
        <div >
            <div className={`text-black ${optionalStyle ? '' : ''} mb-5 grid grid-cols-12 grid-rows-auto font-['Lato']`}>
                    <div className={`row-span-1 ${optionalStyle ? '' : (`${dark ? "bg-gray-900" : 'bg-none'}`)} col-span-full grid grid-cols-12 grid-rows-auto`}>
                        <Link prefetch={true} href={`/pages/community/post/${post_id}`} className={`py-5 col-start-2 col-end-12 row-start-2 row-end-4 ${dark ? "text-white bg-gray-950" : "text-black bg-white"} border border-sp-purpleBright2 rounded-[20px]`}></Link>
                            <div className={`col-start-3 col-end-11 row-start-2 row-end-3 ${dark ? "text-white" : "text-black"}`}>
                                    <div className="mt-4 flex items-center justify-between">
                                        <Link prefetch={true} href={`/pages/community/${community_id}`}>
                                            <img loading="lazy" className="w-10 h-10 mr-3 rounded-full object-cover" src={`${community_icon ? community_icon : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"}`} />
                                        </Link>
                                        <Link prefetch={true} href={`/pages/community/post/${post_id}`} className="mr-auto text-base flex flex-col w-full font-semibold font-['Lato']">
                                            <Link className="font-bold w-fit" prefetch={true} href={`/pages/community/${community_id}`}>@{community_name} <span className="font-normal text-xs">•</span> <span className="font-normal">{dayjs(date).fromNow()}</span></Link>
                                            <Link className="w-fit" prefetch={true} href={`/pages/profile/${user_id}`}>by {user_name}</Link>
                                        </Link>
                                        <div className="self-center text-center origin-center justify-self-center">
                                            <BarDotsBlack handleClickSelect={handleClickSelect} setSavedUsers={setSavedUsers} setBlockedUsers={setBlockedUsers} user_id={user_id} post_id={post_id} isAuthor={isAuthor} options={isAuthor ? ["Save", "Delete", "Share"] : ["Save", "Block", "Share"]}></BarDotsBlack>
                                        </div>
                                    </div>
                                        <Link prefetch={true} href={`/pages/community/post/${post_id}`} className="w-full">
                                            <div className="text-2xl w-fit font-bold font-['Lato'] py-4">{title}</div>
                                        </Link>
                                        <div className="w-full flex flex-col">
                                            <div className="flex flex-wrap w-fit">
                                                {tags && tags.map((tag, index) => (
                                                    <Tag key={index} onClick={onTagClick} style="bg-sp-purple text-white my-1 hover:bg-sp-accent hover:text-black transition-colors duration-200" text={`${tag}`}></Tag>
                                                ))}
                                            </div>
                                        </div>
                                        {url_image 
                                        ? 
                                        <div className="w-[100%] pt-4 pb-4">
                                            <Link prefetch={true} href={`/pages/community/post/${post_id}`} className="w-[100%] mt-4 mb-4">
                                                <div className="relative grid-cols-5 w-full h-[500px] overflow-hidden rounded-3xl">
                                                
                                                    <div
                                                        className="absolute col-start-1 col-end-6 inset-0 bg-cover bg-center filter blur-md"
                                                        style={{ 
                                                            backgroundImage: `url(${url_image})`,
                                                            minWidth: '500px',
                                                            minHeight: '500px',
                                                        }}
                                                    ></div>

                                                    <div className="absolute col-start-1 col-end-6 inset-0 bg-black bg-opacity-50"></div>

                                                    <img
                                                        src={`${url_image}`}
                                                        alt="Post Image"
                                                        className="relative z-10 mx-auto h-full object-cover"
                                                    />

                                                </div>
                                            </Link>      
                                    </div>
                                                    
                                    :
                                        <Link prefetch={true} href={`/pages/community/post/${post_id}`} className="w-[100%] mt-4 mb-4">
                                            <div className="py-4">
                                                <h2 className="text-lg">
                                                    {content}
                                                </h2>
                                            </div>
                                        </Link>      
                                    }
                            
                            
                        </div>
                        <div className="col-start-3 col-end-12 row-start-3 row-end-4 pb-4 row-span-1 col-span-full">
                                <Avaliacao likedState={isLiked} handleLiked={handleLiked} handleUnliked={handleUnliked}
                                comments={comments} likes={postlikes} dark={dark}/>    
                        </div>
                </div>   
            </div>
        </div>
    </>
}

export default CommunityPostSecond