import Tagsnews from "../atoms/tagsnews"
import TextNews from "../atoms/textnews"
import Radiohead from "../assets/band.png"
import PlaceholderComunidade from "./placeholder"

import {News} from '../../../../lib/definitions';
import React from "react";
import Link from "next/link";

interface NewsAsProps {
    news : News[];
}

const BottomNews: React.FC<NewsAsProps> = ( { news } ) => {
    const size = news.length;
    
    return <>
        <div className="grid grid-cols-12 grid-rows-auto gap-5">

            {news.map((newsItem, index) => (
                <Link prefetch={true} href={`/pages/home/news/${newsItem.id}`} className={`col-start-2 col-end-9 col-span-9 row-start-${index + 1}`} key={newsItem.id}>
                    <span className={`col-span-1 row-start-${index + 1} row-end-${index + 2}`}></span>
                    <div className={`col-span-7 row-start-${index + 1} row-end-${index + 2} grid grid-cols-7 grid-rows-2 gap-5 pb-3 ${index < size - 1 ? 'border-solid border-b-[1px] border-sp-purpleBright' : ''}`}>
                    <img className="col-span-3 row-span-2 w-full min-h-[255px] max-h-[255px] h-full object-fill rounded-3xl border-gray-200" src={newsItem.url} alt="Imagem Notícia" />
                        <div className="col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center border-gray-200 p-4">
                            <Tagsnews time={newsItem.created_at} tag={newsItem.tag} userId={newsItem.user_id} />
                            <TextNews title={newsItem.title} content={newsItem.content} />
                        </div>
                    </div>
                </Link>
            ))}

            <div className="col-span-3 row-start-1 row-span-3 h-[350px]">
                <PlaceholderComunidade></PlaceholderComunidade>
            </div>
        </div>
    </>
}

export default BottomNews