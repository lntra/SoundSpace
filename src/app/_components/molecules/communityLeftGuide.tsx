import { type UUID } from "crypto";
import { api } from "~/trpc/react";
import { type Communities, type Following_commmunity } from "~/lib/definitions";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import NavLeftGuide from "../atoms/navLeftGuide";
import PlaceholderProps from "./placeholderProps";
import Link from "next/link";

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
          <div className="min-h-max w-full flex-grow">
          {!!localRoute && (
  <>
    <div className="min-h-max w-full flex-col gap-4 font-bold text-textNav">
                      {localFollowing.map((page, index) => (
                        <div
                          key={index}
                          className={`${
                            dark ? "text-white hover:bg-gray-800" : "hover:bg-gray-200"
                          } `}
                        >
                          <Link
                            href={`/pages/community/${page.id}`}
                            className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2"
                          >
                            <div className="mr-2 h-[36px] min-h-[36px] w-[36px] min-w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
                              <img
                                src={page.url_icon}
                                alt="Community Image Placeholder"
                                width={36}
                                height={36}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-normal">{page.name}</p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </>
                )}

        </PlaceholderProps>
      </div>
  );
};

export default CommunityLeftGuide;
