import { type News } from "../../../lib/definitions";

interface NewsAsProps {
  news: News[];
}

const Headers: React.FC<NewsAsProps> = ({ news }) => {
  return (
    <div className="flex h-[100%] flex-wrap content-end items-end justify-center px-4 pb-2 font-['Lato'] drop-shadow-2xl">
      <h1 className="text-[40px] font-bold drop-shadow-lg">{news[0]?.title}</h1>
      <p className="text-[20px] drop-shadow-lg">{news[0]?.content}</p>
    </div>
  );
};

export default Headers;
