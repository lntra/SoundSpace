"use client"

import { Dispatch, SetStateAction } from "react";
import Trending from "./trending"

interface DestaquesCommunityProps {
    position : string;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    dark : boolean
}

const DestaquesCommunity : React.FC<DestaquesCommunityProps> = ( {search, setSearch, position, dark} ) => {
    return <>
       <div className="w-[100%] flex ml-3">
            <Trending dark={dark} search={search} setSearch={setSearch} position={`${position}`} topics={["Trending","Recent","Hot Topics","Top Rated"]}></Trending>
       </div>
    </>
}

export default DestaquesCommunity