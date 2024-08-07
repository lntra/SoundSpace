import Onebigtime from "../assets/onegbigtime.png"
import Mantequilla from "../assets/mantequilla.png"
import Saturday from "../assets/saturday.png"

import Headers from "../molecules/headers"
import Headers2 from "../molecules/headers2"
import PlaceholderComunidade from "../molecules/placeholder"

import {News} from '../../../../lib/definitions';
import Link from "next/link"
import PlaceholderProps from "../molecules/placeholderProps"
import ResponsiveText from "../atoms/responsiveText"
import UserPost from "../molecules/UserPost"
import Button from "../atoms/button"
import HighlightsNav from "../molecules/highlightsNav"

interface NewsAsProps {
    news : News[];
}

const MainBanner: React.FC<NewsAsProps> = ( { news } ) => {
    const mainNews = news.slice(0, 1)
    const secondaryNews = news.slice(1 , 3)

    const staticDate = new Date('2024-05-30T10:00:00Z');
    const staticUUID = '123e4567-e89b-12d3-a456-426614174000';

    return <>
        <div className="min-h-[676px] grid grid-cols-12 grid-rows-2 gap-2 header-background"
            style={{
                //background: 'hsla(267, 41%, 34%, 1)',
                //backgroundImage: `linear-gradient(315deg, hsla(267, 41%, 34%, 1) 44%, hsla(257, 69%, 53%, 1) 100%);`,
                //filter: "progid: DXImageTransform.Microsoft.gradient( startColorstr='#53337A', endColorstr='#6232DA', GradientType=1 )",
              }}
        >
            <span className="col-span-1 row-span-2"></span>
            <div className="col-span-4 row-span-2 p-3 hover:p-0 transition-all duration-200">
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
                    <span className="self-end">
                        <Headers news={mainNews}></Headers>
                    </span>
                </Link>
            </div>
            <div className="col-span-3 row-span-2 flex-wrap flex gap-3">
                {secondaryNews.map((newsItem, index) => (
                        <div className="flex min-h-[48.48%] drop-shadow-lg justify-end items-end p-3 hover:p-0 transition-all duration-200">
                            <Link
                                prefetch={true}
                                href={`home/news/${newsItem.id}`}
                                key={`home/news/${newsItem.id}`}
                                className="card flex min-h-[100%] drop-shadow-lg justify-end items-end"
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
            <div className="col-span-3 row-span-2 p-3">
                <HighlightsNav></HighlightsNav>
            </div>
            <span className="col-span-1 row-span-2"></span>
        </div>
    </>
}

export default MainBanner