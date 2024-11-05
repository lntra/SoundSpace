import { type UUID } from "crypto";
import { api } from "~/trpc/react";
import { type Communities, type Following_commmunity } from "~/lib/definitions";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import NavLeftGuide from "../atoms/navLeftGuide";

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
      <div>
        <NavLeftGuide forYouRoute={forYouRoute} setForYou={setForYou}/>
      </div>
  );
};

export default CommunityLeftGuide;
