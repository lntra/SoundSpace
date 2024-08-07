import IconCommunity from "../assets/community.png"

interface CommunityBannerProps{
    background?: string;
    icon?: string;
    name?: string
}

const CommunityBanner: React.FC<CommunityBannerProps> = ( {background, icon, name} ) => {
    return <>
        <div className="grid grid-rows-7 grid-cols-12 gap-1 h-64 mb-1 bg-white">
            <div className="row-start-1 row-end-5 col-start-1 col-end-13 h-40">
                <div className="w-[100%] h-[100%] max-h-[160px] bg-sp-purple">
                    <img className=" opacity-25 w-full max-h-[160px] object-cover" src={background} alt={name} />
                </div>
            </div>
            <div className="row-start-4 row-end-6 col-start-2 col-end-6 grid grid-cols-4 mt-9">
                    <div className="col-start-1 z-50 col-end-1 justify-self-center">
                        <img className="w-28 h-28 rounded-full border-indigo-50 border-[4px] border-slate-20" src={icon} />
                    </div>
                    <div className="col-start-2 col-end-5 grid grid-cols-3 grid-rows-2">
                        <div className="row-start-1 row-end-1 col-start-1 col-end-4 self-end">
                            <div className="text-black text-[28px] font-bold font-['Lato']">{name}</div>
                        </div>
                        <div className="row-start-2 col-start-1 col-end-5 flex">
                            <div className="w-28 h-[34px] px-5 py-2.5 bg-sp-purpleBright2 rounded-3xl justify-center items-center gap-2.5 inline-flex col-start-1 row-start-2 row-end-2">
                                <div className="text-white text-sm font-bold font-['Lato']">Follow</div>
                            </div>
                            <div className="h-[34px] ml-2 flex">
                                <div className=" w-[100%] self-center text-sp-purple text-base font-bold font-['Lato']">48k members</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
}

export default CommunityBanner