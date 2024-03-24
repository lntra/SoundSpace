import CommunityCentralPosts from "../molecules/communityPost"
import CommunityLeftGuide from "../molecules/communityLeftGuide"
import CommunityRightGuide from "../molecules/communityRightGuide"
import DestaquesCommunity from "../atoms/destaquescommunity"
import Posts from "./posts"

const CommunityPostsSection = () => {
    return <>
        <div className="grid grid-rows-auto grid-cols-10">
            <div className="row-start-1 row-end-1 col-start-3">
                <DestaquesCommunity></DestaquesCommunity>
            </div>
            <div className="row-start-2 row-end-2 col-span-10 grid grid-rows-1 grid-cols-10">
                <div className="mb-3 self-start sticky top-0 col-start-1 col-end-3">
                    <CommunityLeftGuide></CommunityLeftGuide>
                </div>
                <div className="col-start-3 col-end-9">
                    <Posts></Posts>
                </div>
                <div className="mb-3 self-start sticky top-0 col-start-9 col-end-11">
                    <CommunityRightGuide></CommunityRightGuide>
                </div>
            </div>
        </div>
    </>
}

export default CommunityPostsSection