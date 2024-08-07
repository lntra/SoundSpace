import Bandfoto from "../assets/bandfoto.png"
import BarHeart from "../atoms/barHeart"
import BarComments from "../atoms/barComments"
import BarDots from "../atoms/BarDots"
import { UUID } from "crypto";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

interface CommunityPostProps {
    color?: string;
    pressed?: string;
    title: string;
    content?: string;
    date: Date;
    user_id: UUID;
    post_id: UUID;
}

const CommunityPost: React.FC<CommunityPostProps> = ( {title, content, date, user_id, post_id} ) => {
    return <>
       <div className="mb-3">
            <div className="w-[100%] h-52 grid grid-cols-sp grid-rows-2">
                <div className="col-start-1 col-end-1 row-start-1 row-end-3 w-14 flex items-start rounded-l-[20px] bg-sp-purple">
                    <div className="h-[100%] flex flex-wrap items-start justify-center">
                        <div className="mt-4 text-white">
                            <div className="self-center justify-self-center text-center">
                                <BarHeart color="white" pressed="none"></BarHeart>
                            </div>
                            <p className="w-[100%] text-center text-base font-semibold">34.4K</p>
                            <div className="mt-1 text-center">
                                <BarComments color="white"></BarComments>
                            </div>
                            <p className="w-[100%] text-center text-base font-semibold">303</p>
                        </div>
                        <div className="mb-4 text-end justify-self-end self-end">
                            <BarDots></BarDots>
                        </div>
                    </div>
                </div>
                <div className="col-start-2 col-end-4 row-span-2 grid grid-cols-auto grid-rows-6 rounded-tr-[20px] rounded-br-[20px] gap-4 border border-sp-purpleBright2 bg-white w-[100%]">
                    <div className="col-start-1 col-end-1 row-start-2 row-end-6 self-center">
                        <a href="#">
                            <img className="ml-5 w-52 rounded-[20px]" src={Bandfoto.src} />
                        </a>
                    </div>
                    <div className="col-start-2 col-end-2 row-start-2 row-end-2">
                        <div className="flex items-center">
                            <span className="w-8 h-8 mr-1 rounded-full bg-black"></span>
                            <p className="text-black">To community <strong>@Jazz Lounge</strong></p>
                        </div>
                    </div>
                    <div className="xl:pr-32 col-start-2 col-end-2 row-start-3 row-end-6 text-black flex flex-wrap">
                        <a href="#" className="flex justify-center items-center">
                            <p className="font-semibold text-2xl text-center">{title}</p>
                        </a>
                        <div className="text-end self-end">
                            <p className="text-lg">Posted by <a href="" className="font-bold">{user_id}</a> {dayjs(date).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </>
}

export default CommunityPost