"use client"

import useSessionData from "~/app/hooks/useSessionData";
import CommunityLeftGuide from "../molecules/communityLeftGuide"
import CommunityRightGuide from "../molecules/communityRightGuide"
import DestaquesCommunity from "../atoms/destaquescommunity"
import Posts from "./posts"
import HighlightsNav from "../molecules/highlightsNav";
import { UUID } from "crypto";
import HighlightsNavTags from "../molecules/highlightsNavTags";
import { useState } from "react";

interface CommunityPostsSectionProps {
    type : string;
    id ?: UUID;
    name ?: string;
    description ?: string;
    rules ?: string[];
    links ?: string[];
    dark : boolean
}

const CommunityPostsSection : React.FC<CommunityPostsSectionProps> = ( {dark, type , id , name, description, rules, links } ) => {
    
    const { data, isLoading, error } = useSessionData();

    const [tags, setTags] = useState("")

    const [search, setSearch] = useState("Trending");

    const [forYouRoute, setForYouRoute] = useState(false);

    const handleFilterTagClick = ( tagText : string ) => {
        setTags(tagText)
    } 

    return <>
        <div className="grid grid-rows-auto grid-cols-10 w-[100%]">
            <div className="row-start-1 z-20 row-end-1 col-start-3 col-end-9 grid grid-cols-12 grid-rows-auto">
                <div className="col-start-1 col-end-12 md:col-start-1 md:col-end-12 lg:col-start-2 lg:col-end-12">
                    <DestaquesCommunity dark={dark} search={search} setSearch={setSearch} position="mt-1"></DestaquesCommunity>
                </div>
            </div>
            <div className="row-start-1 row-end-1 col-start-3">
            </div>
            <div className="row-start-2 row-end-2 col-span-10 grid grid-rows-1 grid-cols-10">
                <div className="hidden mb-3 self-start sticky top-[20%] col-start-1 col-end-4 lg:col-start-1 lg:col-end-3 lg:flex justify-center">
                    <CommunityLeftGuide dark={dark} forYouRoute={forYouRoute} setForYou={setForYouRoute} userId={data?.user.id as UUID}></CommunityLeftGuide>
                </div>
                <div className="col-start-1 col-end-12 sm:col-start-1 sm:col-end-12 md:col-start-2 md:col-end-10 lg:col-start-3 lg:col-end-9">
                    <Posts dark={dark} forYouRoute={forYouRoute} search={search} setSearch={setSearch} tags={tags} id={id} tagsState={handleFilterTagClick}></Posts>
                </div>
                <div className="mb-3 self-start sticky top-[20%] col-start-9 col-end-11 flex justify-center">
                    {type == "home" ? 
                    <div className="hidden lg:block w-[18vw] text-textNav min-h-[567px] max-h-[567px]">
                        <HighlightsNavTags dark={dark} tags={tags} type={type} tagsState={handleFilterTagClick}/> 
                    </div>
                    : <CommunityRightGuide 
                            name={name} 
                            description={description} 
                            rules={rules} 
                            links={links}
                            dark={dark}
                    />}
                </div>
            </div>
        </div>
    </>
}

export default CommunityPostsSection