import Tagsnews from "../atoms/tagsnews"
import TextNews from "../atoms/textnews"
import Radiohead from "../assets/band.png"

import {News} from '../../../lib/definitions';
import React from "react";
import Link from "next/link";
import PlaceholderProps from "./placeholderProps";
import UserPost from "./UserPost";
import Highlights from "../atoms/highlight";
import { InfiniteData } from "@tanstack/react-query";

interface NewsAsProps {
    news : any;
    disabledIds : any;
    dark : boolean;
}

const BottomNews = ( { news , disabledIds, dark } : NewsAsProps ) => {
        
    return <>
        {news.pages.map((page : any, index : any) => (
            <div className={` overflow-x-hidden col-span-12 p-3 lg:col-start-2 lg:col-end-9 lg:col-span-9 row-start-${index + 1}`} key={index}>
                {page.allNews
                .filter((newsItem : News) => !disabledIds.has(newsItem.id))
                .map(( newsItem : News, index : number) => (
                    <div key={newsItem.id}>
                        <Link prefetch={true} href={`/pages/home/news/${newsItem.id}`} className={`pt-4`} key={newsItem.id}>
                            <div className={`${index === 0 ? `` : `pt-5`} col-span-7 row-start-${index + 1} row-end-${index + 2} grid grid-cols-7 grid-rows-2 gap-0 md:gap-5 pb-5 border-solid border-b-[1px] border-sp-purpleBright2`}>
                            <img className="col-span-4 self-center p-4 sm:p-0 row-span-2 w-full h-[255px] sm:col-span-3 sm:w-full sm:min-h-[255px] sm:max-h-[255px] sm:h-full object-cover rounded-3xl border-gray-200" src={newsItem.url} alt="Imagem Notícia" />
                            <div className="col-span-3 sm:col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center border-gray-200 p-0 sm:p-5">
                                <Tagsnews dark={dark} time={newsItem.created_at} tag={newsItem.tag} userId={newsItem.user_id} userName={newsItem.user_name} />
                                <TextNews dark={dark} title={newsItem.title} content={newsItem.content} />
                            </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        ))}   
    </>
}

export default BottomNews