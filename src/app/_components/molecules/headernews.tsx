import { News } from "~/lib/definitions";

import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";
dayjs.extend(relativeTime);

interface NewsAsProps {
    news : News[];
    dark : boolean
}

const HeaderNews: React.FC<NewsAsProps> = ({news , dark}) => {
    return <>
        <div className="grid grid-cols-12">
            <span className="col-span-2"></span>
            <div className="col-span-8">
                <div className="col w-[100%] pb-3 mt-6 text-3xl sm:text-5xl font-bold font-['Lato']">{news[0]?.title}</div>
                <div className="w-[100%] pb-1 text-xl sm:text-2xl font-medium font-['Lato']">{news[0]?.content}</div>
                {news[0]?.created_at && (
                <div className={`w-[100%] border-solid pb-3 border-b-[5px] ${dark ? "border-sp-purpleBright2" : "border-sp-purpleBright2"} `}><span className="text-base font-normal font-['Lato']"> {news[0].created_at.toLocaleString()} - By </span><span className=" text-base font-bold font-['Lato']">{news[0]?.user_name}</span></div>
                )}
            </div>
            <span className="col-span-2"></span>
        </div>
    </>
}

export default HeaderNews