import { useState } from "react";
import IconCommunity from "../assets/community.png"
import FollowButton from "../molecules/follow";
import { UUID } from "crypto";

interface CommunityBannerProps{
    background?: string;
    icon?: string;
    name?: string;
    followings?: number;
    isFollowed: boolean;
    handleFollow: () => void;
    handleUnfollow: () => void;
    dark : boolean
}

const CommunityBanner: React.FC<CommunityBannerProps> = ( {handleFollow, handleUnfollow, isFollowed, followings, background, icon, name, dark} ) => {
    
    return <>
        <div className={`grid grid-rows-7 grid-cols-12 gap-1 h-[295px] sm:h-[295px] mb-1  ${dark ? "text-white bg-gray-950" : "text-black bg-white"}`}>
            <div className="row-start-1 row-end-5 sm:row-start-1 sm:row-end-5 col-start-1 col-end-13 h-[200px]">
                <div className="w-[100%] h-[100%] max-h-[200px] bg-sp-purple">
                    <img className=" opacity-25 w-full max-h-[200px] object-cover" src={background} alt={name} />
                </div>
            </div>
            <div className="row-start-3 row-end-6 sm:row-start-4 sm:row-end-6 3xl:col-start-2 sm:col-start-2 sm:col-end-12 3xl:col-end-11 col-start-1 col-end-13 grid grid-cols-[auto_1fr] auto-rows-min gap-2">
                    <div className="pl-4 sm:pl-0 col-start-1 z-10 col-end-1 row-start-1 row-end-4 justify-self-center">
                        <img className="w-28 h-28 sm:w-32 sm:h-32 sm:min-w-[128px] object-cover rounded-full border-indigo-50 border-[4px] border-slate-20" src={icon} />
                    </div>
                    <div className="pl-4 sm:pl-0 row-start-5 row-end-6 col-start-1 col-end-12 sm:row-start-2 sm:row-end-4 sm:col-start-2 sm:col-end-2 grid grid-cols-3 grid-rows-2">
                        <div className="row-start-1 row-end-1 col-start-1 col-end-4 self-end">
                            <div className={`${dark ? "text-white" : "text-black"}  text-2xl sm:text-[28px] font-bold font-['Lato']`}>{name}</div>
                        </div>
                        <div className="row-start-2 col-start-1 col-end-5 flex ">
                            <div className={`w-28 h-[34px] ${dark ? "text-white" : "text-white"}`}>
                                <FollowButton dark={true} followState={isFollowed} handleFollow={handleFollow} handleUnfollow={handleUnfollow}></FollowButton>
                            </div>
                            <div className={`h-[34px] ml-2 flex ${dark ? "text-white" : "text-sp-purple"}`}>
                                <div className=" w-[100%] whitespace-nowrap self-center text-base font-bold font-['Lato']">{followings ? followings : 0} members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
}

export default CommunityBanner