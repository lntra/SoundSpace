"use client";

import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";
import { NextPage } from "next";

import NavigationBar from "../../../../_components/organisms/navigationBar"
import NewsReadContent from "~/app/_components/organisms/news";
import Footer from "~/app/_components/atoms/footer";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import RejectedPage from "~/app/_components/organisms/rejectedPage";

const NewsPage: NextPage = () => {
    const pathname = usePathname();
    const id = pathname.split("/").pop();

    const { data, isLoading, error } = api.home.getNewsByID.useQuery({
        newsId : id as string
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

    console.log(data.newsPage);

    return <>
        <main className="bg-sp-greyish text-white">
            <div className=" bg-indigo-50 font-['Lato']">
                <NavigationBar></NavigationBar>
                    {data && <NewsReadContent news={data.newsPage}></NewsReadContent>}
                <Footer></Footer>
            </div>
        </main>
    </>
}

export default NewsPage