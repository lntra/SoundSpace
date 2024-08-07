"use client"

import Trending from "./trending"

const DestaquesCommunity = () => {
    return <>
       <div className="w-[100%] flex ml-3">
            <Trending topics={["Trending","Recent","Hot Topics","Top Rated"]}></Trending>
       </div>
    </>
}

export default DestaquesCommunity