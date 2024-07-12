import { UUID } from "crypto"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

interface TagsnewsProps {
    time : Date,
    userId : UUID,
}

const UserPost: React.FC<TagsnewsProps> = ( { time, userId }) => {
    return <>
            <div className="w-6 h-6 xl:hidden bg-gray-900 rounded-full"></div>
            <div className="h-4 text-gray-900 xl:text-xs text-xs font-bold font-['Lato']">@realtime posted by ADMIN {dayjs(time).fromNow()}</div>
    </> 
}

export default UserPost