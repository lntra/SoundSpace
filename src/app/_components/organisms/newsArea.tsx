"use client";

import BottomPage from "./bottompage"
import LoadingPage from "./loadingPage";
import MainBanner from "./mainbanner"

import { api } from "~/trpc/react";

interface NewsAreaProps {
    dark : boolean
}

export function NewsArea( {dark} : NewsAreaProps ) {
    const { data , isLoading } = api.home.getNewsDefault.useQuery();
    
    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }
    
    const headerNews = data?.newsArticles.slice(0, 3);

    const headerNewsIds = new Set(headerNews?.map(article => article.id));

    console.log(headerNewsIds)

    const downNews = data?.newsArticles.filter(article => !headerNewsIds.has(article.id));

    return <>
        <div className={`overflow-x-hidden ${dark ? "text-white bg-gray-900" : "text-black bg-white bg-gradient-to-b from-sp-tp-page to-bg-white" }
`}>
            {headerNews && <MainBanner dark={dark} news={headerNews}></MainBanner>}
            {downNews && <BottomPage dark={dark} disabledIds={headerNewsIds}></BottomPage>}
        </div>
    </>
}

export default NewsArea