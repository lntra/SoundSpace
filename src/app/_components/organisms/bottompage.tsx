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
            <div className="flex flex-wrap justify-center items-center m-6">
                <Trending topics={["Trending","Articles","News","Recent"]}></Trending>
            </div>
            <BottomNews news={news}></BottomNews>
        </div>
        <Footer></Footer>
    </>
}

export default BottomPage