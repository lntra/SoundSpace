import CommunityLeftGuide from "../molecules/communityLeftGuide"
import CommunityRightGuide from "../molecules/communityRightGuide"
import DestaquesCommunity from "../atoms/destaquescommunity"
import Posts from "./posts"
import HighlightsNav from "../molecules/highlightsNav";
import { UUID } from "crypto";

interface CommunityPostsSectionProps {
    type : string;
    id ?: UUID;
    name ?: string;
    description ?: string;
    rules ?: string[];
    links ?: string[];
}

const CommunityPostsSection : React.FC<CommunityPostsSectionProps> = ( {type , id , name, description, rules, links } ) => {
    return <>
        <div className="grid grid-rows-auto grid-cols-10 w-[100%]">
            <div className="row-start-1 row-end-1 col-start-3">
                <DestaquesCommunity></DestaquesCommunity>
            </div>
            <div className="row-start-2 row-end-2 col-span-10 grid grid-rows-1 grid-cols-10">
                <div className="mb-3 self-start sticky top-[20%] col-start-1 col-end-3 flex justify-center">
                    <CommunityLeftGuide></CommunityLeftGuide>
                </div>
                <div className="col-start-3 col-end-9">
                    <Posts id={id}></Posts>
                </div>
                <div className="mb-3 self-start sticky top-[20%] col-start-9 col-end-11 flex justify-center">
                    {type == "home" ? 
                    <div className="w-[18vw] text-textNav min-h-[567px] max-h-[567px]">
                        <HighlightsNav type={type}/> 
                    </div>
                    : <CommunityRightGuide 
                            name={name} 
                            description={description} 
                            rules={rules} 
                            links={links}
                    />}
                </div>
            </div>
        </div>
    </>
}

export default CommunityPostsSection