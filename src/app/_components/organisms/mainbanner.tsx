import Onebigtime from "../assets/onegbigtime.png"
import Mantequilla from "../assets/mantequilla.png"
import Saturday from "../assets/saturday.png"

import Headers from "../molecules/headers"
import Headers2 from "../molecules/headers2"
import PlaceholderComunidade from "../molecules/placeholder"

import {News} from '../../../../lib/definitions';

interface NewsAsProps {
    news : News[];
}

const MainBanner: React.FC<NewsAsProps> = ( { news } ) => {
    const mainNews = news.slice(0, 1)
    const secondaryNews = news.slice(1 , 3)

    return <>
        <div className="min-h-[650px] grid grid-cols-12 grid-rows-2 gap-5 bg-gradient-to-br	from-violet-900 to-sp-purple">
            <span className="col-span-1 row-span-2"></span>
            <div className="col-span-4 row-span-2 flex flex-wrap justify-center" 
                style={{
                background: `
                linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                url(${Onebigtime.src}) lightgray 50% / cover no-repeat`,
                border: `2px solid #96429A`,
                borderRadius: `20px`,
                }}>
                <span className="self-end">
                    <Headers news={mainNews}></Headers>
                </span>
            </div>
            <div className="col-span-3 row-span-2 flex-wrap">
                {secondaryNews.map((newsItem, index) => (
                        <span
                            key={newsItem.id}
                            className="flex min-h-[48.48%]"
                            style={{
                                background: `
                                linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                                url(${index === 0 ? Mantequilla.src : Saturday.src}) lightgray 50% / cover no-repeat`,
                                border: `2px solid #96429A`,
                                borderRadius: `20px`,
                            }}
                        >
                            <Headers2 news={[newsItem]}></Headers2>
                        </span>
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