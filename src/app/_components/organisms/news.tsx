import TextArticle from "../atoms/textArticle"
import ContentNews from "../molecules/contentnews"
import HeaderNews from "../molecules/headernews"

const NewsReadContent = () => {
    return <>
        <div className="bg-gradient-to-b from-sp-tp-page to-bg-indigo-50">
            <HeaderNews></HeaderNews>
            <ContentNews></ContentNews>
            <TextArticle></TextArticle>
        </div>
    </>
}

export default NewsReadContent