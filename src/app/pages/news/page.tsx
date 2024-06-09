import Footer from "../../_components/atoms/footer"
import NavigationBar from "../../_components/organisms/navigationBar"
import NewsReadContent from "../../_components/organisms/news"

const NewsPage = () => {
    return <>
        <div className="font-['Lato']">
            <NavigationBar></NavigationBar>
            <NewsReadContent></NewsReadContent>
            <Footer></Footer>
        </div>
    </>
}

export default NewsPage