import Headers from "../molecules/headers";
import Headers2 from "../molecules/headers2";

import { type News } from "../../../lib/definitions";
import Link from "next/link";
import HighlightsNav from "../molecules/highlightsNav";

interface NewsAsProps {
  news: News[];
  dark: boolean;
}

const MainBanner: React.FC<NewsAsProps> = ({ news, dark }) => {
  const mainNews = news.slice(0, 1);
  const secondaryNews = news.slice(1, 3);

  return (
    <>
      <div
        className={`header-background grid min-h-[676px] grid-cols-12 grid-rows-2 gap-2`}
      >
        <span className="row-span-2 hidden xl:col-span-1 xl:flex 2xl:col-span-1 2xl:flex 3xl:col-span-1"></span>
        <div className="col-span-12 row-span-2 p-3 transition-all duration-200 hover:p-0 md:col-span-8 md:row-span-2 xl:col-span-6 xl:row-span-2 2xl:col-span-4">
          <Link
            prefetch={true}
            href={`home/news/${mainNews[0]?.id ?? ""}`}
            className="card flex flex-wrap justify-center drop-shadow-lg"
            style={{
              background: `
                    linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                    url(${mainNews[0]?.url}) lightgray 50% / cover no-repeat`,
              border: `2px solid #53337B`,
              borderRadius: `20px`,
              width: "100%",
              height: "100%",
            }}
          >
            <span className="self-end text-white">
              <Headers news={mainNews}></Headers>
            </span>
          </Link>
        </div>
        <div className="hidden flex-wrap gap-3 md:visible md:col-span-4 md:row-span-2 md:flex xl:visible xl:flex 2xl:col-span-3 2xl:row-span-2 3xl:col-span-3 3xl:row-span-2">
          {secondaryNews.map((newsItem, index) => (
            <div
              key={index}
              className="flex min-h-[48.48%] items-end justify-end p-3 drop-shadow-lg transition-all duration-200 hover:p-0"
            >
              <Link
                prefetch={true}
                href={`home/news/${newsItem.id}`}
                key={`home/news/${newsItem.id}`}
                className="card flex min-h-[100%] items-end justify-end text-white drop-shadow-lg"
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
        <div className="col-span-3 row-span-2 hidden p-3 2xl:visible 2xl:flex">
          <HighlightsNav dark={dark}></HighlightsNav>
        </div>
        <span className="col-span-1 row-span-2"></span>
      </div>
    </>
  );
};

export default MainBanner;
