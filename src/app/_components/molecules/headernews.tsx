import { type News } from "~/lib/definitions";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

interface NewsAsProps {
  news: News[];
  dark: boolean;
}

const HeaderNews: React.FC<NewsAsProps> = ({ news, dark }) => {
  return (
    <>
      <div className="grid grid-cols-12">
        <span className="col-span-2"></span>
        <div className="col-span-8">
          <div className="col mt-6 w-[100%] pb-3 font-['Lato'] text-3xl font-bold sm:text-5xl">
            {news[0]?.title}
          </div>
          <div className="w-[100%] pb-1 font-['Lato'] text-xl font-medium sm:text-2xl">
            {news[0]?.content}
          </div>
          {news[0]?.created_at && (
            <div
              className={`w-[100%] border-b-[5px] border-solid pb-3 ${
                dark ? "border-sp-purpleBright2" : "border-sp-purpleBright2"
              } `}
            >
              <span className="font-['Lato'] text-base font-normal">
                {" "}
                {news[0].created_at.toLocaleString()} - By{" "}
              </span>
              <span className=" font-['Lato'] text-base font-bold">
                {news[0]?.user_name}
              </span>
            </div>
          )}
        </div>
        <span className="col-span-2"></span>
      </div>
    </>
  );
};

export default HeaderNews;
