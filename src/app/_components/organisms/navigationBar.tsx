"use client"

import { useEffect, useState } from "react";
import BarComponents from "../molecules/barIcons";
import Link from "next/link";
import { api } from "~/trpc/react";
import LoadingPage from "./loadingPage";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";
import useSessionData from "~/app/hooks/useSessionData";

interface NavigationBarProps {
    dark : boolean
}

const NavigationBar = ( {dark} : NavigationBarProps ) => {

    const router = useRouter();

    const [text, setText] = useState("")

    const [nav, setNav] = useState(false); 

    const handleTextChange = ( event : boolean ) => {
        setNav(event)
    }

    useEffect(() => {
        const handleScroll = () => {
            setNav(false)
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    },[])
    
    const {data, isLoading} = useSessionData()
 
    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.01] z-50">
                <LoadingPage></LoadingPage>
        </div>
    }
    
    let name = data?.user.name as string
    let image = data?.user.url_icon as string
    let uuid = data?.user.id as UUID
    
    return <>
        <span className = "w-[100%] h-24">
            {data && (
                <>
                    <BarComponents dark={dark} id={uuid} name={name} image={image} change={handleTextChange} value={text} text={setText}></BarComponents>
                    <div 
                        className={`grid grid-cols-12 truncate line-clamp-1 pb-4 px-4 top-20 text-black
                            ${nav ? 
                            `fixed right-[8.5%] w-[82.5vw] h-[25vh] ${dark ? "bg-gray-950 text-white" : "bg-white text-black"} z-50 duration-300` 
                            : 
                            `fixed right-[8.5%] top-[-100%] w-[82.5vw] h-[25vh] ${dark ? "bg-gray-950 text-white" : "bg-white text-black"}  z-50 duration-300`
                            }
                        `}>
                            <div className="w-full truncate line-clamp-1 col-start-2 col-end-12 flex flex-col justify-center items-center">
                                <Link href={`/pages/community/display/search/${text}`} className={`p-4 w-full font-[Lato] border-b border-b-sp-purpleBright2 ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} `}>
                                    <h1 className="text-xl">Search {text} in Communities</h1>
                                </Link>
                                <Link href={`/pages/home/news/search/${text}`} className={`p-4 w-full font-[Lato] border-b border-b-sp-purpleBright2 ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} `}>
                                    <h1 className="text-xl">Search {text} in News</h1>
                                </Link> 
                                <Link href={`/pages/community/search/${text}`} className={`p-4 w-full font-[Lato] border-b border-b-sp-purpleBright2 ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} `}>
                                    <h1 className="text-xl">Search {text} in Posts</h1>
                                </Link>
                            </div>
                    </div>
                </>
            )}
            
        </span>
    </>
}

export default NavigationBar