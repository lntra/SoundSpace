import { News } from "~/lib/definitions";

interface NewsAsProps {
    news : News[];
}

const ContentNews: React.FC<NewsAsProps> = ({ news }) => {
    return <>
        <div className="grid grid-cols-10 grid-rows-12 gap-x-5 justify-items-center pt-[17px]">
            <span className="col-span-2"></span>
            <img className="col-span-6 w-[100%] drop-shadow-lg" src={news[0]?.url} alt={news[0]?.description} />
            <span className="col-span-2"></span>
            <div className="col-span-2 row-start-2 row-end-2 col-start-3 justify-self-start">
                <p className="text-base whitespace-nowrap font-normal">{news[0]?.description}</p>
            </div>
        </div>
    </>
}
 
export default ContentNews