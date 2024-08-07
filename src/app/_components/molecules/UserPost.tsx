import { UUID } from "crypto"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

interface TagsnewsProps {
    time? : Date,
    userId? : UUID,
    style? : string,
    textStyle? : string,
    text? : string
}

const UserPost: React.FC<TagsnewsProps> = ( { time, userId, style, textStyle, text }) => {
    return <>
            <div className={`${style != null ? style : "w-6 h-6 mr-1 rounded-full"} bg-gray-900`}>
                <img src="" alt="" />
            </div>
            <div className={`${textStyle != null ? textStyle : "h-4 text-center font-bold xl:text-xs text-xs"} text-gray-900 font-['Lato']`}>@realtime 
                {time && (
                    <span className="text-[12px] text-center"> <span className="text-[9px]">🞄</span> {dayjs(time).fromNow()}</span>)
                }
            </div>
    </> 
}

export default UserPost