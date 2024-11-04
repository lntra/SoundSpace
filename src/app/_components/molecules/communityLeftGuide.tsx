import { type UUID } from "crypto";
import NavLeftGuide from "../atoms/navLeftGuide";
import PlaceholderProps from "./placeholderProps";
import UserPost from "./UserPost";
import { api } from "~/trpc/react";
import Image from "next/image";
import placeholder from "../../_components/assets/placeholder.png";
import { type Communities, type Following_commmunity } from "~/lib/definitions";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import Highlights from "../atoms/highlight";

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

  const [reload, setReload] = useState(false);

  const [localFollowing, setLocalFollowing] = useState<Communities[]>(() =>
    getFollowedCommunities(),
  );

  useEffect(() => {
    if (!data || !localFollowing) {
      return;
    }

    if (localFollowing.length > 0) {
      setLocalRoute(true);
    } else {
      setReload(!reload);
    }
  }, [data, localFollowing, reload]);

  useEffect(() => {
    const storedFollowedCommunities = localStorage.getItem(
      "followedCommunities",
    );
    setLocalFollowing(
      storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [],
    );
  }, []);

  return (
      <div>
        teste
      </div>
  );
};

export default CommunityLeftGuide;
