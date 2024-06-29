"use client";

import BottomPage from "./bottompage"
import LoadingPage from "./loadingPage";
import MainBanner from "./mainbanner"

import { api } from "~/trpc/react";

export function NewsArea() {
    const { data , isLoading } = api.home.getNews.useQuery({current : 0});
    
    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }
    
    const headerNews = data?.newsArticles.slice(0, 3);

    const downNews = data?.newsArticles.slice(3);


    return <>
        <div className="bg-gradient-to-b from-sp-tp-page to-bg-indigo-50">
            {headerNews && <MainBanner news={headerNews}></MainBanner>}
            <BottomPage></BottomPage>
        </div>
    </>
}

export default NewsArea