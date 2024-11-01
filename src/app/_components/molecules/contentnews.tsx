import { type News } from "~/lib/definitions";

interface NewsAsProps {
  news: News[];
}

const ContentNews: React.FC<NewsAsProps> = ({ news }) => {
  return (
    <>
      <div className="grid-rows-12 grid grid-cols-10 justify-items-center gap-x-5 pt-[17px]">
        <span className="col-span-2"></span>
        <img
          className="col-span-6 w-[100%] drop-shadow-lg"
          src={news[0]?.url}
          alt={news[0]?.description}
        />
        <span className="col-span-2"></span>
        <div className="col-span-2 col-start-3 row-start-2 row-end-2 justify-self-start">
          <p className="whitespace-nowrap text-base font-normal">
            {news[0]?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ContentNews;
