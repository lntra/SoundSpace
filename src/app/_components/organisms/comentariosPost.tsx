import { UUID } from "crypto";
import CommentsView from "../atoms/comments"
import { api } from "~/trpc/react";
import LoadingPage from "./loadingPage";

import { Comments ,CommentsWithReplies } from "~/lib/definitions";
import CommentsItems from "../molecules/commentsItems";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ComentariosPostProps {
    postID : UUID;
    setVisible : any;
    likedComments : string[];
    setLikedComments: Dispatch<SetStateAction<string[]>>;
    search: string;
    size: Dispatch<SetStateAction<number>>;
    userComments: Comments[];
    setUserComments: Dispatch<SetStateAction<Comments[]>>;
    dark: boolean;
}

export const organizeComments = (comments: Comments[]): CommentsWithReplies[] => {

    const commentMap: { [key: string]: CommentsWithReplies } = {};

    comments.forEach(comments => {
        commentMap[comments.id] = { ...comments, replies: [] };
    });

    const rootComments: CommentsWithReplies[] = [];

    comments.forEach(comments => {
        if (comments.parent_comment_id !== null) {
            const parentComment = commentMap[comments.parent_comment_id];
            const currentComment = commentMap[comments.id];

            if (parentComment && currentComment) {
                parentComment.replies.push(currentComment);
            }
        } else {
            const currentComment = commentMap[comments.id];
            if (currentComment) {
                rootComments.push(currentComment);
            }
        }
    });

    console.log(rootComments)

    return rootComments;
};

const ComentariosPost = ( { userComments, setUserComments, dark , size, postID, setVisible, likedComments, setLikedComments, search } : ComentariosPostProps ) => {

    const trendingRoute = api.posts.getPostsComments.useQuery(
        { postId : postID , type : "trending" },
        {
            enabled: search === "Trending",
        }
    )

    const recentRoute = api.posts.getPostsComments.useQuery(
        { postId : postID , type : "recent" },
        {
            enabled: search === "Recent",
        }
    )

    const oldRoute = api.posts.getPostsComments.useQuery(
        { postId : postID , type : "old" },
        {
            enabled: search === "Old",
        }
    )

    const discussedRoute = api.posts.getPostsComments.useQuery(
        { postId : postID , type : "discussed" },
        {
            enabled: search === "Discussed",
        }
    )

    const getCurrentQuery = () => {
        switch (search) {
          case "Trending":
            return trendingRoute;
          case "Recent":
            return recentRoute;
          case "Old":
            return oldRoute;
          case "Discussed":
            return discussedRoute;
          default:
            return { data: null, isLoading: false} ;
        }
    };

    const {
        data,
        isLoading,
    } = getCurrentQuery();

    const [organized, setOrganized] = useState<CommentsWithReplies[]>([])

    useEffect(() => {
        if (data) {
            const filter = userComments.filter((e: Comments) => e.post_id === postID);
            
            const resultado = filter.length > 0 
                ? (data.commentsData === null ? [...filter] : [...filter, ...data.commentsData]) 
                : data.commentsData;
            
            const organizedComments = resultado ? organizeComments(resultado) : [];
            
            setOrganized(organizedComments);
            
            setVisible(organizedComments.length > 0 ? "visible" : "hidden");
            size(organizedComments.length);  
        } else {
            setVisible("hidden");
            size(0);  
        }
    }, [data, setVisible, size, postID, userComments]);

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    return <>
        <div className="w-[100%] flex flex-wrap justify-end mb-4">
            {organized.map((comments, index) => (
                <CommentsItems userComments={userComments} setUserComments={setUserComments} dark={dark} likedComments={likedComments} setLikedCommments={setLikedComments} key={index} comment={comments}></CommentsItems>
            ))}
        </div>
    </>
}

export default ComentariosPost