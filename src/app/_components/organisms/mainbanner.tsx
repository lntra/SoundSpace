import Onebigtime from "../assets/onegbigtime.png"
import Mantequilla from "../assets/mantequilla.png"
import Saturday from "../assets/saturday.png"

import Headers from "../molecules/headers"
import Headers2 from "../molecules/headers2"
import PlaceholderComunidade from "../molecules/placeholder"

import {News} from '../../../../lib/definitions';
import Link from "next/link"

interface NewsAsProps {
    news : News[];
}

const MainBanner: React.FC<NewsAsProps> = ( { news } ) => {
    const mainNews = news.slice(0, 1)
    const secondaryNews = news.slice(1 , 3)

    return <>
        <div className="min-h-[650px] grid grid-cols-12 grid-rows-2 gap-5"
            style={{
                background: 'hsla(267, 41%, 34%, 1)',
                backgroundImage: `linear-gradient(135deg, hsla(267, 41%, 34%, 1) 41%, hsla(297, 40%, 43%, 1) 100%)`,
                filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#53337B', endColorstr='#96429A', GradientType=1)",
              }}
        >
            <span className="col-span-1 row-span-2"></span>
            <Link prefetch={true} href={`home/news/${mainNews[0]?.id ?? ""}`} className="col-span-4 row-span-2 drop-shadow-lg flex flex-wrap justify-center" 
                style={{
                background: `
                linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                url(${mainNews[0]?.url}) lightgray 50% / cover no-repeat`,
                border: `2px solid #96429A`,
                borderRadius: `20px`,
                 width: '100%',
                 height: '100%'
                }}>
                <span className="self-end">
                    <Headers news={mainNews}></Headers>
                </span>
            </Link>
            <div className="col-span-3 row-span-2 flex-wrap flex gap-4">
                {secondaryNews.map((newsItem, index) => (
                        <Link
                            prefetch={true}
                            href={`home/news/${newsItem.id}`}
                            key={`home/news/${newsItem.id}`}
                            className="flex min-h-[48.48%] drop-shadow-lg justify-end items-end"
                            style={{
                                background: `
                                linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                                url(${newsItem.url}) lightgray 50% / cover no-repeat`,
                                border: `2px solid #96429A`,
                                borderRadius: `20px`,
                            }}
                        >
                            <Headers2 news={[newsItem]}></Headers2>
                        </Link>
                    ))}
            </div>
            <div className="col-span-3 row-span-2">
                <PlaceholderComunidade></PlaceholderComunidade>
            </div>
            <span className="col-span-1 row-span-2"></span>
        </div>
    </>
}

export default MainBanner