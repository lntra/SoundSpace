"use client"

import Button from "../atoms/button"
import ResponsiveText from "../atoms/responsiveText"
import PlaceholderProps from "./placeholderProps"
import UserPost from "./UserPost"

interface HighlightsNavProps {
    type?: string
}

const HighlightsNav: React.FC<HighlightsNavProps> = ( {type} ) =>{

    const staticDate = new Date('2024-05-30T10:00:00Z');
    const staticUUID = '123e4567-e89b-12d3-a456-426614174000';

return<>
        <PlaceholderProps 
            title="Weekly Highlights" 
            className={`flex flex-col ${type == "home" ? "" : "drop-shadow-lg"} flex-grow items-center  h-full  justify-between w-full`}>
                <div className={`flex-grow overflow-y-auto ${type == "home" ? "max-h-[410px]" : "max-h-[525px]"}  w-full p-3`}>
                    <div className="w-full">
                        <div className="w-full text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] border-sp-purpleBright2 overflow-hidden">
                            <div className="grid auto-cols-auto auto-rows-auto">
                                <div className="row-start-1 row-end-2 col-start-1 col-end-2 flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="row-start-2 row-end-3 col-start-1 col-end-2 text-wrap w-full text-base font-bold">
                                    <ResponsiveText text={'Genshin keeps crashing on the America server and I cant find anything to help online'}></ResponsiveText>
                                </div>
                                <div className="row-start-3 row-end-4 col-start-1 col-end-2">
                                    <div className="flex flex-row text-wrap gap-1 text-sm">
                                        <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                        <p className="text-[11px]"></p>
                                        <ResponsiveText text={'100 likes'}></ResponsiveText>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center row-start-1 row-end-3 col-start-2 col-end-3 pl-1">
                                    <div className="w-20 h-20 3xl:w-24 3xl:h-24 rounded-[20px] inset-0 bg-black">
                                        <img className="object-cover rounded-[20px] w-full h-full bg-black" src={""} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP Alguém para montar uma banda em SP Alguém para montar uma banda em SP Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center align-middle items-center w-full">
                        <div className="flex text-gray-950 gap-1 pt-2 pb-2  hover:bg-gray-200 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                            <div className="flex flex-col w-full">
                                <div className="flex text-wrap items-center whitespace-nowrap w-full h-[100%]">
                                    <UserPost time={staticDate} userId={staticUUID}></UserPost>
                                </div>
                                <div className="flex flex-row text-wrap w-full text-base font-bold h-[100%]">
                                    <ResponsiveText text={'Alguém para montar uma banda em SP'}></ResponsiveText>
                                </div>
                                <div className="flex flex-row text-wrap w-full gap-1 text-sm h-[100%]">
                                    <ResponsiveText text={'20 comentários'}></ResponsiveText>
                                    <p className="text-[11px]"></p>
                                    <ResponsiveText text={'100 likes'}></ResponsiveText>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-16 flex justify-center align-middle">
                    <Button text="Find Communities"></Button>
                </div>
        </PlaceholderProps>
    </>
}

export default HighlightsNav