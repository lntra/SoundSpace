import { type News } from "~/lib/definitions";
import TextArticle from "../atoms/textArticle";
import ContentNews from "../molecules/contentnews";
import HeaderNews from "../molecules/headernews";

interface NewsAsProps {
  news: News[];
  dark: boolean;
}

const NewsReadContent: React.FC<NewsAsProps> = ({ news, dark }) => {
  return (
    <>
      <div
        className={`${
          dark
            ? "bg-gray-900 text-white"
            : "to-bg-white bg-gradient-to-b from-sp-tp-page text-black"
        }`}
      >
        {news && <HeaderNews dark={dark} news={news}></HeaderNews>}
        {news && <ContentNews news={news}></ContentNews>}
        {news && <TextArticle news={news}></TextArticle>}
      </div>
    </>
  );
};

export default NewsReadContent;
