import { UUID } from "crypto";
import CommentsView from "../atoms/comments"
import { api } from "~/trpc/react";
import LoadingPage from "./loadingPage";

import { Comments ,CommentsWithReplies } from "lib/definitions";
import CommentsItems from "../molecules/commentsItems";

interface ComentariosPostProps {
    postID : UUID;
    setVisible : any;
}


const organizeComments = (comments: Comments[]): CommentsWithReplies[] => {

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

    return rootComments;
};


const ComentariosPost : React.FC<ComentariosPostProps> = ( { postID, setVisible } ) => {

    const { data, isLoading, error } = api.posts.getPostsComments.useQuery({
        postId : postID
    })

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    const resultado = data?.commentsData 
    let organizedComments = undefined

    if(resultado){
        organizedComments = data ? organizeComments(resultado) : [];
        setVisible("visible");
    } else{
        setVisible("hidden");
    }

    return <>
        <div className="w-[100%] flex flex-wrap justify-end">
            {organizedComments?.map((comments, index) => (
                <CommentsItems comment={comments}></CommentsItems>
            ))}
        </div>
    </>
}

export default ComentariosPost