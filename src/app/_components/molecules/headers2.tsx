import { type News } from "../../../lib/definitions";

interface NewsAsProps {
  news: News[];
}

const Headers2: React.FC<NewsAsProps> = ({ news }) => {
  if (!news.length) {
    return null;
  }

  const title = news[0]?.title;

  return (
    <>
      <div className="bg-placeholder self-end px-4 pb-2 font-['Lato']">
        <h1 className="text-[28px] font-bold drop-shadow-lg">{title}</h1>
      </div>
    </>
  );
};

export default Headers2;
