import { type UUID } from "crypto";
import { api } from "~/trpc/react";
import { type Communities, type Following_commmunity } from "~/lib/definitions";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import NavLeftGuide from "../atoms/navLeftGuide";
import PlaceholderProps from "./placeholderProps";

interface CommunityLeftGuideProps {
  userId: UUID;
  setForYou: Dispatch<SetStateAction<boolean>>;
  forYouRoute: boolean;
  dark: boolean;
}

const getFollowedCommunities = (): Communities[] => {
  const storedFollowedCommunities = localStorage.getItem("followedCommunities");
  return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const CommunityLeftGuide = ({
  userId,
  forYouRoute,
  setForYou,
  dark,
}: CommunityLeftGuideProps) => {
  const [localRoute, setLocalRoute] = useState<boolean>(false);

  const { data, isLoading, error } =
    api.user.getUserFollowingCommunities.useInfiniteQuery({
      userId: userId,
    });

  const [localFollowing, setLocalFollowing] = useState<Communities[]>(getFollowedCommunities);

  useEffect(() => {
    if (localFollowing.length > 0) {
      setLocalRoute(true);
    } 
  }, [localFollowing]);

  useEffect(() => {
    if (localFollowing) {
      localStorage.setItem("followedUsers", JSON.stringify(localFollowing));
    }
  }, [localFollowing]);

  return (
      <div className="min-h-[567px] w-full lg:w-[18vw]">
        <PlaceholderProps
          dark={dark}
          className="flex h-full flex-col z-0"
          size="max-h-[567px] min-h-[567px]"
        >
          <NavLeftGuide forYouRoute={forYouRoute} setForYou={setForYou}/>
        </PlaceholderProps>
      </div>
  );
};

export default CommunityLeftGuide;
