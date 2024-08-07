import BarComments from "./barComments";
import BarInvisible from "./barInvisible";
import BarHeart from "./barHeart";
import { useState } from "react";
import { UUID } from "crypto";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

interface CommentsProps {
    userID : UUID;
    createdAt : Date;
    content : string;
    hidden: string;
    onHide: () => void;
}

const CommentsView : React.FC<CommentsProps> = ( {userID , createdAt, content, hidden, onHide} ) => {
    const [stateHeart, setStateHeart] = useState("")

    const handleclick = () => {
        if(stateHeart == ""){
            setStateHeart("#53337B")
        }
        else{
            setStateHeart("")
        }
    }

    return (
        <div style={{ display: hidden }} className={`w-full py-3 px-5 rounded-[20px] border border-sp-purpleBright2 grid grid-cols-[40px_1fr] gap-x-3 grid-rows-auto my-2`}>
            <div className="row-start-1 row-end-1 col-start-1 col-end-2 flex items-center w-[40px]">
                <img className="w-10 h-10 rounded-full border border-sp-purpleBright2" src="https://via.placeholder.com/32x32" alt="User Avatar" />
            </div>
            <div className="row-start-1 row-end-1 col-start-2 col-end-3 flex items-center">
                <div>
                    <span className="text-base font-bold font-['Lato']">{userID}</span>
                    <span className="text-base font-semibold font-['Lato']"> - {dayjs(createdAt).fromNow()}</span>
                </div>
            </div>
            <div onClick={handleclick} className="row-start-2 row-end-2 col-start-1 col-end-2 flex flex-wrap flex-col items-center justify-center w-[40px]">
                <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : "#53337B"} />
                <p className="text-sm font-semibold">13.4K</p>
            </div>
            <div className="row-start-2 row-end-2 col-start-2 col-end-3 flex items-center">
                <div className="w-full min-w-full max-w-fit text-gray-900 text-base font-normal font-['Lato']">
                    {content}
                </div>
            </div>
            <div className="row-start-3 row-end-3 col-start-2 col-end-3 flex items-center mt-1">
                <div className="flex items-center mx-1">
                    <BarComments color="#6C7871" />
                    <p className="text-sm text-stone-500 font-semibold">Reply</p>
                </div>
                <div onClick={onHide} className="flex items-center mx-1">
                    <BarInvisible color="#6C7871" />
                    <p className="text-sm text-stone-500 font-semibold">Hide</p>
                </div>
            </div>
        </div>
    );
}

export default CommentsView;
