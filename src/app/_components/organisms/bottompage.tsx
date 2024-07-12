import { News } from "lib/definitions";
import Footer from "../atoms/footer"
import Trending from "../atoms/trending"
import BottomNews from "../molecules/bottomNews"

interface NewsAsProps {
    news : News[];
}

const BottomPage : React.FC<NewsAsProps> = ( { news } ) => {
    return <>
        <div className="bg-indigo-50">
            <Trending></Trending>
            <BottomNews news={news}></BottomNews>
        </div>
        <Footer></Footer>
    </>
}

export default BottomPage