import Footer from "../../_components/atoms/footer"
import NavigationBar from "../../_components/organisms/navigationBar"
import NewsReadContent from "../../_components/organisms/news"

const NewsPage = () => {
    return <>
            <NavigationBar></NavigationBar>
            <NewsReadContent></NewsReadContent>
            <Footer></Footer>
    </>
}

export default NewsPage