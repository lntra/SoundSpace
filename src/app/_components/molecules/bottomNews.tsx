import Tagsnews from "../atoms/tagsnews";
import TextNews from "../atoms/textnews";

import { type News } from "../../../lib/definitions";
import React from "react";
import Link from "next/link";

interface NewsAsProps {
  news: any;
  disabledIds: any;
  dark: boolean;
}

const BottomNews = ({ news, disabledIds, dark }: NewsAsProps) => {
  return (
    <>
      {news.pages.map((page: any, index: any) => (
        <div
          className={` col-span-12 overflow-x-hidden p-3 lg:col-span-9 lg:col-start-2 lg:col-end-9 row-start-${
            index + 1
          }`}
          key={index}
        >
          {page.allNews
            .filter((newsItem: News) => !disabledIds.has(newsItem.id))
            .map((newsItem: News, index: number) => (
              <div key={newsItem.id}>
                <Link
                  prefetch={true}
                  href={`/pages/home/news/${newsItem.id}`}
                  className={`pt-4`}
                  key={newsItem.id}
                >
                  <div
                    className={`${
                      index === 0 ? `` : `pt-5`
                    } col-span-7 row-start-${index + 1} row-end-${
                      index + 2
                    } grid grid-cols-7 grid-rows-2 gap-0 border-b-[1px] border-solid border-sp-purpleBright2 pb-5 md:gap-5`}
                  >
                    <img
                      className="col-span-4 row-span-2 h-[255px] w-full self-center rounded-3xl border-gray-200 object-cover p-4 sm:col-span-3 sm:h-full sm:max-h-[255px] sm:min-h-[255px] sm:w-full sm:p-0"
                      src={newsItem.url}
                      alt="Imagem Notícia"
                    />
                    <div className="col-span-3 row-span-2 flex flex-wrap content-center items-center justify-start border-gray-200 p-0 sm:col-span-4 sm:p-5">
                      <Tagsnews
                        dark={dark}
                        time={newsItem.created_at}
                        tag={newsItem.tag}
                        userId={newsItem.user_id}
                        userName={newsItem.user_name}
                      />
                      <TextNews
                        dark={dark}
                        title={newsItem.title}
                        content={newsItem.content}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default BottomNews;
