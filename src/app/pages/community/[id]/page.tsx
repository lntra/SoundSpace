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

const CommunityPage : NextPage = () => {
    const pathname = usePathname();
    const id = pathname.split("/").pop();

    const {data, isLoading, error} = api.community.getCommunityByID.useQuery({
        communityId : id ?? "",
    })

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
        <main className="text-white">
            <div className="font-['Lato']">
                <NavigationBar></NavigationBar>
                <div className="bg-gradient-to-b from-sp-tp-page to-indigo-50">
                    {data &&
                        <>
                            <CommunityBanner 
                                name={data.communityPage[0]?.name}
                                icon={data.communityPage[0]?.url_icon}
                                background={data.communityPage[0]?.url_banner}>
                            </CommunityBanner>
                            <CommunityPostsSection 
                            id={data.communityPage[0]?.id}
                            name={data.communityPage[0]?.name}
                            description={data.communityPage[0]?.description}
                            rules={data.communityPage[0]?.rules}
                            links={data.communityPage[0]?.links}
                            type="community"
                            >
                            </CommunityPostsSection>   
                        </>
                    }
                    <Footer></Footer>
                </div>
            </div>
        </main>
    </>
}

export default CommunityPage