import { News } from "lib/definitions";
import TextArticle from "../atoms/textArticle"
import ContentNews from "../molecules/contentnews"
import HeaderNews from "../molecules/headernews"

interface NewsAsProps {
    news : News[];
}

const NewsReadContent: React.FC<NewsAsProps> = ( { news } ) => {
        
    return <>
        <div className="bg-gradient-to-b from-sp-tp-page to-bg-indigo-50">
            {news && <HeaderNews news={news}></HeaderNews>}
            {news && <ContentNews news={news}></ContentNews>}
            {news && <TextArticle news={news}></TextArticle>}
        </div>
    </>
}

export default NewsReadContent