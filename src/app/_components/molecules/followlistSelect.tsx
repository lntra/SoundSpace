import { UUID } from "crypto"
import Link from "next/link"
import { Followers } from "~/lib/definitions"
import { api } from "~/trpc/react"
import NoResults from "../atoms/noResults"
import LoadingPage from "../organisms/loadingPage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface User {
   
    id: UUID,
    email?: string,
    name: string,
    url_icon: string,
    url_banner: string,
    description: string

}

interface FollowListSelectProps {
    followUser : UUID,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const getFollowedUsers = () : User[] => {
    const storedFollowedUsers = localStorage.getItem('followedUsers');
    console.log(storedFollowedUsers)
    return storedFollowedUsers ? JSON.parse(storedFollowedUsers) : [];
};


const FollowListSelect = ( {followUser, setIsOpen} : FollowListSelectProps ) =>{
    
    const [followedUsers, setFollowedUsers] = useState<User[]>(() => getFollowedUsers());

    const { data , isLoading, error } = api.user.getUserFollowing.useInfiniteQuery(
        { userId: followUser as string, cursor: undefined },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    )

    useEffect(() => {
        if(followedUsers && data) {
            console.log(data.pages[0]?.allPosts.length)
            if((data.pages[0]?.allPosts.length > 0)) {
                setFollowedUsers([])
            }   
        }
    },[data])

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    const handleSelect = () => {
        setIsOpen(false)
    }
    
    return <>
        {followedUsers.length < 1 && (
            <>
                {data && data?.pages.map((page, index) => (
                    <div key={index}>
                        {page.allPosts
                        .map((follow: Followers) => (
                            <div key={follow.follower_id}>
                                <div className="p-2 h-full">
                                    <div className="col-span-4 row-span-1 p-4 bg-white border border-sp-purpleBright2 rounded-3xl">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-row flex-nowrap flex-grow justify-between">
                                                <div className="flex gap-3 line-clamp-2  items-center overflow-x-hidden">
                                                    <img className="w-12 h-12 rounded-3xl object-cover" src={`${follow.user_icon !== null ? follow.user_icon : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"}`} alt="" />
                                                    <div className="flex flex-col items-start">
                                                        <h3 className="text-xl font-bold line-clamp-2">{`${follow.user_name}`}</h3>
                                                        <p className=" text-base line-clamp-2 text-start overflow-x-hidden">{`${follow.user_description}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleSelect}
                                                className="bg-sp-purpleBright2 text-white px-4 py-2 rounded self-center hover:bg-sp-accent hover:text-black"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))} 
                {data && data?.pages[0]?.allPosts.length == 0 && (
                    <div className="h-[34.5vh] col-start-2 col-end-12 mt-4 row-start-2">
                        <NoResults dark={false}></NoResults>
                    </div>
                )}
            </>
        )}
        {followedUsers && followedUsers.length > 0 && followedUsers.map((user, index) => (
            <div className="" key={index}>
                <div key={user.id}>
                    <div className="p-2 h-fit">
                        <div className="col-span-4 row-span-1 p-4 bg-white border border-sp-purpleBright2 rounded-3xl">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row flex-nowrap flex-grow justify-between">
                                    <div className="flex gap-3 line-clamp-2  items-center overflow-x-hidden">
                                        <img className="w-12 h-12 rounded-3xl object-cover" src={`${user.url_icon !== null ? user.url_icon  : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"}`} alt="userIcon" />
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold line-clamp-2">{`${user.name}`}</h3>
                                            <p className=" text-base line-clamp-2 overflow-x-hidden">{`${user.description}`}</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSelect}
                                    className="bg-sp-purpleBright2 text-white px-4 py-2 rounded self-center hover:bg-sp-accent hover:text-black"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </>
}

export default FollowListSelect