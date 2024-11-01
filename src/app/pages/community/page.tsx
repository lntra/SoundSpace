"use client"

import { useEffect, useState } from "react"
import CommunityBanner from "../../_components/atoms/banner"
import Footer from "../../_components/atoms/footer"
import CommunityPostsSection from "../../_components/organisms/communityPosts"
import NavigationBar from "../../_components/organisms/navigationBar"
import useDarkMode from "~/app/hooks/useDarkMode"

const CommunityPage = () => {

    const [dark, setDarkMode] = useState<boolean>(false);

    const { darkMode } = useDarkMode();

    useEffect(() => {
        if(darkMode){
            setDarkMode(darkMode)

            console.log(darkMode)
        }
        console.log(darkMode)
    },[darkMode])
    

    return <>
        <main className="text-white">
            <div className="font-['Lato']">
                <NavigationBar dark={dark}></NavigationBar>
                <div className={`${dark ? "text-white bg-gradient-to-b bg-gray-900" : "text-black bg-sp-tp-page"}`}>
                    <CommunityPostsSection dark={dark} type="home"></CommunityPostsSection>
                    <Footer></Footer>
                </div>
            </div>
        </main>
    </>
}

export default CommunityPage