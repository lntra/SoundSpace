"use client"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import DisplaySections from "../atoms/displaySections";
import { useState } from "react";
import LoadingPage from "../organisms/loadingPage";

dayjs.extend(relativeTime);

interface DisplayAreaProps {
    topics: (undefined | string)[];
    dark:boolean
}

const DisplayArea = ( {topics, dark} : DisplayAreaProps ) => {

    const [current , setCurrent] = useState(1);

    const handleClick = () => {
        setCurrent(current + 1)
    }

    return <>
        {topics.map((areas, index) => (
            <div className="col-start-3 col-end-11 row-span-1">
                <h2 className="text-2xl font-bold px-4 py-4">
                    {areas === undefined ? "For You ⭐" : `Best of ${areas.replace(":", " ")}`}
                </h2>
                
                <DisplaySections dark={dark} current={current} topics={`${areas?.split(":")[0]}`}></DisplaySections>
                <div className="w-full flex justify-center">
                    <div onClick={handleClick}>
                        <p className="p-2 cursor-pointer transition-all duration-200 hover:text-black hover:bg-sp-accent text-white rounded-3xl text-base font-bold  bg-sp-purple">Show More</p>
                    </div>
                </div>
            </div>  
        ))}
    </>
}

export default DisplayArea
