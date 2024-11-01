"use client"

import { usePathname } from "next/navigation"
import CommunityBanner from "../../../_components/atoms/banner"
import Footer from "../../../_components/atoms/footer"
import CommunityPostsSection from "../../../_components/organisms/communityPosts"
import NavigationBar from "../../../_components/organisms/navigationBar"
import { NextPage } from "next"
import { api } from "~/trpc/react"
import RejectedPage from "~/app/_components/organisms/rejectedPage"
import LoadingPage from "~/app/_components/organisms/loadingPage"
import { useEffect, useState } from "react"
import { UUID } from "crypto"
import { Communities, Posts } from "~/lib/definitions"
import TextAreaPost from "~/app/_components/atoms/textAreaPost"
import useSessionData from "~/app/hooks/useSessionData"
import useDarkMode from "~/app/hooks/useDarkMode"

const getFollowedCommunities = () : Communities[] => {
    const storedFollowedCommunities = localStorage.getItem('followedCommunities');
    return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const CommunityPage : NextPage = () => {
    const pathname = usePathname();
    const id = pathname.split("/").pop();

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

    const isFollowedStart = followedCommunities.some(followedCommunity => followedCommunity.id === id);

    const [isFollowed , setIsFollowed] = useState(isFollowedStart)

    useEffect(() => {
        if (followedCommunities) {
            localStorage.setItem('followedCommunities', JSON.stringify(followedCommunities));
        }
    }, [followedCommunities]);

    const { data : userData } = useSessionData();

    const {data, isLoading, error} = api.community.getCommunityByID.useQuery({
        communityId : id ?? "",
    })

    const handleFollow = () => {
        if (!isFollowed) {
            if(data?.communityPage[0])
            setFollowedCommunities([...followedCommunities, data.communityPage[0]]); 
            setIsFollowed(true)
        }
    };

    const handleUnfollow = () => {
        if (isFollowed) {
            setFollowedCommunities(followedCommunities.filter(followedCommunity => followedCommunity.id !== id)); 
            setIsFollowed(false)
        }
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

    return <>
        <main className="">
            <div className="font-['Lato']">
                <NavigationBar dark={dark}></NavigationBar>
                <div className={`${dark ? "text-white bg-gray-900" : "bg-gradient-to-b from-sp-tp-page to-indigo-50"}`}>
                    {data &&
                        <>
                            <CommunityBanner 
                                dark={dark}
                                name={data.communityPage[0]?.name}
                                icon={data.communityPage[0]?.url_icon}
                                background={data.communityPage[0]?.url_banner}
                                followings={(isFollowed ? ((Number(data.communityPage[0]?.followings)) + 1) : data.communityPage[0]?.followings)}
                                isFollowed={isFollowed}
                                handleFollow={handleFollow}
                                handleUnfollow={handleUnfollow}
                            />
                            {!!isFollowed && data.communityPage[0] && userData && (
                                <div className="grid grid-rows-auto grid-cols-12 w-[100%]">
                                    <div className="col-start-2 col-end-12 sm:col-start-4 sm:col-span-6 xl:col-start-5 xl:col-end-9">
                                        <TextAreaPost 
                                            community_id={data.communityPage[0].id} 
                                            community_name={data.communityPage[0].name} 
                                            community_icon={data.communityPage[0].url_icon}
                                            user_id={userData?.user.id as UUID}    
                                            user_name={userData?.user.name as string}
                                            user_icon={userData?.user.url_icon as string}
                                            dark={dark}
                                        />
                                    </div>
                                </div>
                            )}
                            <CommunityPostsSection 
                                dark={dark}
                                id={data.communityPage[0]?.id}
                                name={data.communityPage[0]?.name}
                                description={data.communityPage[0]?.description}
                                rules={data.communityPage[0]?.rules}
                                links={data.communityPage[0]?.links}
                                type="community"
                            />
                        </>
                    }
                    <Footer></Footer>
                </div>
            </div>
        </main>
    </>
}

export default CommunityPage