import { UUID } from "crypto"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import UserPost from "../molecules/UserPost";

dayjs.extend(relativeTime);

interface TagsnewsProps {
    time : Date,
    tag : string,
    userId : UUID,
    dark : boolean,
    userName : string | undefined
}

const Tagsnews: React.FC<TagsnewsProps> = ( { time, tag, userId, dark, userName }) => {
    return <>
        <div className="flex justify-start items-center mb-2.5 gap-1">
            <div className={`text-xs font-bold font-['Lato'] ${dark ? "bg-[#a585cc] text-white" : "bg-sp-purple text-white"} px-2 py-1 rounded-full`}>{tag}</div>
            <UserPost text={`${userName ? `by ${userName}` : ""}`} dark={dark} disableImg={true} time={time} userId={userId}></UserPost>
        </div>
    </> 
}

export default Tagsnews