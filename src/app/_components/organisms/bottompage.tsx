import Footer from "../atoms/footer"
import Trending from "../atoms/trending"
import News from "../molecules/news"

const BottomPage = () => {
    return <>
        <div className="bg-indigo-50">
            <Trending></Trending>
            <News></News>
        </div>
        <Footer></Footer>
    </>
}

export default BottomPage