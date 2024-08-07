"use client"

import CommunityPost from "../molecules/communityPost"

import { api } from "~/trpc/react"
import LoadingPage from "./loadingPage"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import { UUID } from "crypto";
import { useEffect } from "react";
import Link from "next/link"

dayjs.extend(relativeTime);

interface PostsProps{
    id?: UUID;
}

const Posts : React.FC<PostsProps> = ( {id} ) => {

    console.log(id + "id é")

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = id != undefined
    ? api.posts.getPostsByIDInfinite.useInfiniteQuery(
        { communityId: id as string, cursor: undefined },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    )
    : api.posts.getAllPosts.useInfiniteQuery(
        { cursor: undefined } ,
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

    const handleFetchMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                handleFetchMore();
            }
        };
        console.log(hasNextPage)
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return <div className="h-[100vh]">
            <LoadingPage></LoadingPage>    
        </div>;
    }

    return <>
            <div className="w-[100%] min-h-screen">
                <div>
                    {data?.pages.map((page, index) => (
                        <div key={index}>
                            {page.allPosts.map((post: { id: UUID ; content: string ; content_post: string | undefined; user_id : UUID; created_at : Date}) => (
                                <Link href={`/pages/community/post/${post.id}`} key={post.id}>
                                    <CommunityPost
                                        title={post.content}
                                        content={post.content_post}
                                        date={post.created_at}
                                        user_id={post.user_id}
                                        post_id={post.id}
                                    ></CommunityPost>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
    </>
}

export default Posts