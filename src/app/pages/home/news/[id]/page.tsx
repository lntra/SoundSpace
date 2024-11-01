"use client";

import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import { NextPage } from "next";

import NavigationBar from "../../../../_components/organisms/navigationBar"
import NewsReadContent from "~/app/_components/organisms/news";
import Footer from "~/app/_components/atoms/footer";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import RejectedPage from "~/app/_components/organisms/rejectedPage";
import { useEffect, useState } from "react";
import useDarkMode from "~/app/hooks/useDarkMode";


const NewsPage: NextPage = () => {
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

    const { data, isLoading, error } = api.home.getNewsByID.useQuery({
        newsId : id ?? "",
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
        <main className={`${dark ? "bg-gray-900" : "bg-sp-greyish text-white"} font-[Lato]`}>
            <div className={`${dark ? "bg-gray-900" : "bg-sp-greyish text-white"}`}>
                <NavigationBar dark={dark}></NavigationBar>
                    {data && <NewsReadContent dark={dark} news={data.newsPage}></NewsReadContent>}
                <Footer></Footer>
            </div>
        </main>
    </>
}

export default NewsPage