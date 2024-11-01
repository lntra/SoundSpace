"use client"

import NavigationBar from "~/app/_components/organisms/navigationBar"
import Footer from "~/app/_components/atoms/footer"

import { NextPage } from "next"
import { usePathname } from "next/navigation"
import RejectedPage from "~/app/_components/organisms/rejectedPage"
import LoadingPage from "~/app/_components/organisms/loadingPage"
import { api } from "~/trpc/react"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import CommunityPostSecond from "~/app/_components/molecules/communityPostSecond"
import { UUID } from "crypto"
import CardsDisplay from "~/app/_components/molecules/cardsDisplay"

import { Communities } from "~/lib/definitions"
import NoResults from "~/app/_components/atoms/noResults"
import useDarkMode from "~/app/hooks/useDarkMode"
import { useEffect, useState } from "react"

dayjs.extend(relativeTime);

const getFollowedCommunities = () : Communities[] => {
    const storedFollowedCommunities = localStorage.getItem('followedCommunities');
    return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const CommunityDisplayQuery : NextPage  = () => {

    const pathname = usePathname();

    const name = pathname.split("/").pop() || "";

    const {data, isLoading, error} = api.community.getAllCommunitybyQuery.useInfiniteQuery({
        search : name,
    })

    const [dark, setDarkMode] = useState<boolean>(false);

    const { darkMode } = useDarkMode();

    useEffect(() => {
        if(darkMode){
            setDarkMode(darkMode)

            console.log(darkMode)
        }
        console.log(darkMode)
    },[darkMode])

    const [followedCommunities, setFollowedCommunities] = useState<Communities[]>(() => getFollowedCommunities());

    useEffect(() => {
        if (followedCommunities) {
            localStorage.setItem('followedCommunities', JSON.stringify(followedCommunities));
        }
    }, [followedCommunities]);

    const handleFollow = (e : Communities) => {
        setFollowedCommunities([...followedCommunities, e]); 
    };

    const handleUnfollow = (e : UUID) => {
        setFollowedCommunities(followedCommunities.filter(followedCommunity => followedCommunity.id !== e)); 
    };

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    if(error){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
                <RejectedPage></RejectedPage>
        </div>
    }

    console.log(data.pages)

    return <>
        <NavigationBar dark={dark}></NavigationBar>
        <div className={` ${dark ? "bg-gray-900" : "bg-indigo-50"} font-[Lato]`}>
            <div className={` ${dark ? "bg-gray-900" : "bg-indigo-50"} grid grid-rows-auto grid-cols-10 w-[100%] `}>
                <div className="w-[100%] min-h-[71vh] 3xl:col-start-4 3xl:col-end-8 lg:col-start-3 lg:col-end-9 col-start-2 col-end-10 mt-4">
                        <div>
                            {data?.pages.map((page, index) => (
                                <div key={index}>
                                    {page.allCommunities.map((
                                        community : Communities
                                    ) => (
                                        <div key={community.id} className="m-4">
                                            <CardsDisplay dark={dark} handleFollow={handleFollow} handleUnfollow={handleUnfollow} followedCommunities={followedCommunities} data={community}></CardsDisplay>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        {data.pages[0]?.allCommunities[0] === undefined && 
                                <div className="h-full">
                                    <NoResults dark={dark}></NoResults>
                                </div>
                        }
                    </div>
                </div>
            <Footer></Footer>
        </div>
    </>
}

export default CommunityDisplayQuery
