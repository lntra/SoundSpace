import { Comments, CommentsWithReplies } from "~/lib/definitions";
import CommentsView from "../atoms/comments";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CommentsItemsProps {
    comment : CommentsWithReplies;
    iteration?: number;
    likedComments : string[];
    setLikedCommments : Dispatch<SetStateAction<string[]>>;
    userComments: Comments[];
    setUserComments?: Dispatch<SetStateAction<Comments[]>>;
    dark: boolean;
    outsidePost?: boolean;
}

const CommentsItems : React.FC<CommentsItemsProps> = ( { userComments, setUserComments, likedComments, setLikedCommments, comment, iteration = 0, dark, outsidePost } ) => {

    const [hidden, setHidden] = useState("");
    
    const handleInvisible = () => {
        setHidden("none");
    }

    const [isLiked , setIsLiked] = useState(likedComments.includes(comment.id))

    useEffect(() => {
        localStorage.setItem("likedComments", JSON.stringify(likedComments));
    },[likedComments])

    const handleLikedComments = () => {
        if(comment && comment.id){
            if (!isLiked) {
                setLikedCommments((e) => [...e, comment.id]);
                setIsLiked(true)
            }
        }
    };

    const handleUnlikedComments = () => {
        if(comment && comment.id){
            if (isLiked) {
                setLikedCommments((e) => e.filter(likedPost => likedPost !== comment.id)); 
                setIsLiked(false)
            }
        }
    };

    return <>
        <div style={{display : hidden}} className="w-full">
            <CommentsView 
                commentID={comment.id}
                userID={comment.user_id} 
                postId={comment.post_id}
                content={comment.content}
                createdAt={comment.created_at}
                hidden={hidden}
                onHide={handleInvisible}
                userImage={comment.user_icon}
                userName={comment.user_name}
                likes={comment.likes}
                likedState={isLiked}
                handleLiked={handleLikedComments}
                handleUnliked={handleUnlikedComments}
                dark={dark}
                outsidePost={outsidePost}
                userComments={userComments}
                setUserComments={setUserComments}
            />  
            {comment.replies.length > 0 && (
                <div className="w-full flex-col flex items-end justify-end">
                    { comment.replies.map((comment, index)=> (
                        <div key={comment.id.toString()} className={`${iteration < 5 ? "w-[90%]" : "w-[100%]"}`}>
                            <CommentsItems userComments={userComments} setUserComments={setUserComments} dark={dark} likedComments={likedComments} setLikedCommments={setLikedCommments} iteration={iteration + 1} outsidePost={outsidePost} comment={comment}></CommentsItems>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
}

export default CommentsItems;
