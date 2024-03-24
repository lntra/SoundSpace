import IconCommunity from "../assets/community.png"

const CommunityBanner = () => {
    return <>
        <div className="grid grid-rows-7 grid-cols-12 gap-1 h-64 mb-1 bg-indigo-50">
            <div className="row-start-1 row-end-5 col-start-1 col-end-13 h-40">
                <div className="w-[100%] h-[100%] bg-sp-purple" />
            </div>
            <div className="row-start-4 row-end-6 col-start-2 col-end-6 grid grid-cols-4 mt-9">
                    <div className="col-start-1 col-end-1 justify-self-center">
                        <img className="w-28 h-28 rounded-full border-2 border-slate-20" src={IconCommunity.src} />
                    </div>
                    <div className="col-start-2 col-end-5 grid grid-cols-3 grid-rows-2">
                        <div className="row-start-1 row-end-1 col-start-1 col-end-4 self-end">
                            <div className="text-black text-[28px] font-bold font-['Lato']">The Band, from Outer Space</div>
                        </div>
                        <div className="row-start-2 col-start-1 col-end-5 flex">
                            <div className="w-28 h-[34px] px-5 py-2.5 bg-sp-purpleBright rounded-3xl justify-center items-center gap-2.5 inline-flex col-start-1 row-start-2 row-end-2">
                                <div className="text-white text-sm font-bold font-['Lato']">Participar</div>
                            </div>
                            <div className="h-[34px] ml-2 flex">
                                <div className=" w-[100%] self-center text-sp-purple text-base font-bold font-['Lato']">48 mil membros</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </>
}

export default CommunityBanner