import { CommentsWithReplies } from "lib/definitions";
import CommentsView from "../atoms/comments";
import { useState } from "react";

interface CommentsItemsProps {
    comment : CommentsWithReplies;
    iteration?: number;
}

const CommentsItems : React.FC<CommentsItemsProps> = ( {  comment, iteration = 0  } ) => {

    const [hidden, setHidden] = useState("");
    
    const handleInvisible = () => {
        setHidden("none");
    }

    console.log(iteration)

    return <>
        <div style={{display : hidden}} className="w-full">
            <CommentsView 
                userID={comment.user_id} 
                content={comment.content}
                createdAt={comment.created_at}
                hidden={hidden}
                onHide={handleInvisible}
            >  
            </CommentsView>
            {comment.replies.length > 0 && (
                <div className="w-full flex-col flex items-end justify-end">
                    { comment.replies.map((comment, index)=> (
                        <div key={comment.id.toString()} className={`${iteration < 5 ? "w-[90%]" : "w-[100%]"}`}>
                            <CommentsItems iteration={iteration + 1} comment={comment}></CommentsItems>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
}

export default CommentsItems;
