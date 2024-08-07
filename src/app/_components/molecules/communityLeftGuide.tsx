import Arrow from "../atoms/arrow";
import Button from "../atoms/button";
import FollowList from "../atoms/followList";
import NavLeftGuide from "../atoms/navLeftGuide";
import PlaceholderComunidade from "./placeholder";
import PlaceholderProps from "./placeholderProps";
import UserPost from "./UserPost";

const CommunityLeftGuide = () => {
    return (
        <div className="w-[18vw] h-[vh] min-h-[567px]">
            <PlaceholderProps className="h-full flex flex-col" size="max-h-[567px] min-h-[567px]">
                <NavLeftGuide />
                <div className="w-full min-h-max flex-grow">
                    <FollowList name="" />
                </div>
                <div className="w-full flex justify-center align-bottom">
                    <div className="flex mt-1">
                        <Arrow directions="left" />
                        <Arrow directions="right" />
                    </div>
                </div>
            </PlaceholderProps>
        </div>
    );
};

export default CommunityLeftGuide;
