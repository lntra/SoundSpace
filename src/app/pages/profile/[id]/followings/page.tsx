"use client"

import { usePathname } from "next/navigation"


import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import DropdownMin from "~/app/_components/atoms/dropdownMin"
import { api } from "~/trpc/react"
import { Comments, Following } from "~/lib/definitions"
import Link from "next/link"
import NoResults from "~/app/_components/atoms/noResults"
import useSessionData from "~/app/hooks/useSessionData"
import { useEffect, useState } from "react"
import { UUID } from "crypto"
import LoadingPage from "~/app/_components/organisms/loadingPage"
import NavigationBar from "~/app/_components/organisms/navigationBar"
import useDarkMode from "~/app/hooks/useDarkMode"

interface User {
   
    id: UUID,
    email?: string,
    name: string,
    url_icon: string,
    url_banner: string,
    description: string

}

const getFollowedUsers = () : User[] => {
    const storedFollowedUsers = localStorage.getItem('followedUsers');
    console.log(storedFollowedUsers)
    return storedFollowedUsers ? JSON.parse(storedFollowedUsers) : [];
};

const Follows   = () => {

    const pathname = usePathname();

    const name = pathname.split("/")[3] || "";

    const { data , isLoading, error } = api.user.getUserFollowing.useInfiniteQuery(
        { userId: name as string, cursor: undefined },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            enabled: name !== ""
        }
    )

    const { data : session } = useSessionData();

    const [sessionId, setSessionId] = useState("");

    const [followedUsers, setFollowedUsers] = useState<User[]>(() => getFollowedUsers());

    const [dark, setDarkMode] = useState<boolean>(false);

    const { darkMode } = useDarkMode();

    useEffect(() => {
        if(darkMode){
            setDarkMode(darkMode)

            console.log(darkMode)
        }
        console.log(darkMode)
    },[darkMode])

    useEffect(() => {
        if(session && session.user.id) {
            const sessionIDvalue = session.user.id as string;
            setSessionId(sessionIDvalue);

            if (sessionIDvalue !== name) {
                console.log("sendo deletado");
                setFollowedUsers([]);
            }
        }
    },[session, name])

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.01] z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    return <>
        <div className="block lg:hidden">
            <NavigationBar dark={dark}></NavigationBar>
        </div>
        <span className="grid grid-cols-pr min-h-screen h-[100%] w-[100%] header-background bg-sp-purple">
            <div className="hidden lg:block md:col-span-1 h-[100%] pr-[1px] w-[100%] bg-sp-purple min-w-[90px] max-w-[90px] fixed left-0">
                <DropdownMin link={sessionId}></DropdownMin>
            </div>
            <div className="col-start-1 lg:col-start-2 col-end-13 h-[100%] w-[100%] font-[Lato]">
                <div className="grid grid-rows-auto grid-cols-10 w-[100%]">
                    <div className="w-[100%] min-h-[71vh] 3xl:col-start-4 3xl:col-end-8 lg:col-start-3 lg:col-end-9 col-start-2 col-end-10 mt-4">
                    {followedUsers && followedUsers.length > 0 && followedUsers.map((user, index) => (
                        <div className="" key={index}>
                            <Link key={user.id} href={`/pages/profile/${user.id}`} >
                                <div className="p-2 h-fit">
                                    <div className="col-span-4 row-span-1 p-4 bg-white border border-sp-purpleBright2 rounded-3xl">
                                        <div className="flex flex-col">
                                            <div className="flex flex-row flex-nowrap flex-grow justify-between">
                                                <div className="flex gap-2 line-clamp-2  items-center overflow-x-hidden">
                                                    <img className="w-12 h-12 rounded-3xl object-cover" src={`${user.url_icon !== null ? user.url_icon  : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"}`} alt="userIcon" />
                                                    <div className="flex flex-col">
                                                        <h3 className="text-xl font-bold line-clamp-2">{`${user.name}`}</h3>
                                                        <p className=" text-base line-clamp-2 overflow-x-hidden">{`${user.description}`}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    {data && data?.pages.map((page, index) => (
                        <div key={index}>
                            {page.allPosts
                            .map((follow: Following) => (
                                <Link key={follow.following_id} href={`/pages/profile/${follow.following_id}`} >
                                    <div className="p-2 h-full">
                                        <div className="col-span-4 row-span-1 p-4 bg-white border border-sp-purpleBright2 rounded-3xl">
                                            <div className="flex flex-col">
                                                <div className="flex flex-row flex-nowrap flex-grow justify-between">
                                                    <div className="flex gap-2 line-clamp-2  items-center overflow-x-hidden">
                                                        <img className="w-12 h-12 rounded-3xl object-cover" src={`${follow.user_icon !== null ? follow.user_icon : "https://placehold.co/40x40/EEE/31343C?font=lato&text=40x40"}`} alt="" />
                                                        <div className="flex flex-col">
                                                            <h3 className="text-xl font-bold line-clamp-2">{`${follow.user_name}`}</h3>
                                                            <p className=" text-base line-clamp-2 overflow-x-hidden">{`${follow.user_description}`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))} 
                    
                    </div>
                </div>
            </div>
        </span>
    </>
}

export default Follows

/*
{data && data?.pages[0]?.allPosts.length == 0 && (
                        <div className="h-[60vh] col-start-2 col-end-12 mt-4 row-start-2">
                            <NoResults dark={true}></NoResults>
                        </div>
                    )}
*/