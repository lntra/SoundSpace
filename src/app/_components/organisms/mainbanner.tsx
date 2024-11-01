import Headers from "../molecules/headers"
import Headers2 from "../molecules/headers2"

import {News} from '../../../lib/definitions';
import Link from "next/link"
import HighlightsNav from "../molecules/highlightsNav"

interface NewsAsProps {
    news : News[];
    dark : boolean
}

const MainBanner: React.FC<NewsAsProps> = ( { news, dark} ) => {
    const mainNews = news.slice(0, 1)
    const secondaryNews = news.slice(1 , 3)

    return <>
        <div className={`min-h-[676px] grid grid-cols-12 grid-rows-2 gap-2 header-background`}>
            <span className="hidden row-span-2 xl:flex xl:col-span-1 2xl:col-span-1 2xl:flex 3xl:col-span-1"></span>
            <div className="col-span-12 row-span-2 md:col-span-8 md:row-span-2 xl:col-span-6 xl:row-span-2 2xl:col-span-4 p-3 hover:p-0 transition-all duration-200">
                <Link prefetch={true} href={`home/news/${mainNews[0]?.id ?? ""}`} 
                className="drop-shadow-lg flex flex-wrap justify-center card" 
                    style={{
                    background: `
                    linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                    url(${mainNews[0]?.url}) lightgray 50% / cover no-repeat`,
                    border: `2px solid #53337B`,
                    borderRadius: `20px`,
                    width: '100%',
                    height: '100%'
                    }}>
                    <span className="self-end text-white">
                        <Headers news={mainNews}></Headers>
                    </span>
                </Link>
            </div>
            <div className="hidden 3xl:col-span-3 3xl:row-span-2 2xl:col-span-3 2xl:row-span-2 flex-wrap gap-3 md:visible md:flex md:col-span-4 md:row-span-2 xl:visible xl:flex">
            {secondaryNews.map((newsItem, index) => (
                        <div key={index} className="flex min-h-[48.48%] drop-shadow-lg justify-end items-end p-3 hover:p-0 transition-all duration-200">
                            <Link
                                prefetch={true}
                                href={`home/news/${newsItem.id}`}
                                key={`home/news/${newsItem.id}`}
                                className="card flex min-h-[100%] drop-shadow-lg justify-end items-end text-white"
                                style={{
                                    background: `
                                    linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                                    url(${newsItem.url}) lightgray 50% / cover no-repeat`,
                                    border: `2px solid #53337B`,
                                    borderRadius: `20px`,
                                }}
                            >
                                <Headers2 news={[newsItem]}></Headers2>
                            </Link>
                        </div>
                    ))}
                </div>
            <div className="hidden col-span-3 row-span-2 2xl:flex 2xl:visible p-3">
                <HighlightsNav dark={dark}></HighlightsNav>
            </div>
            <span className="col-span-1 row-span-2"></span>
        </div>
    </>
}

export default MainBanner