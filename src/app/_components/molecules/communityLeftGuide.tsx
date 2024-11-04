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
      <PlaceholderProps
        dark={dark}
        className="flex w-full flex-grow items-center justify-between h-full flex-col z-0"
      >
        <div className={`w-full flex-grow overflow-y-auto p-3`}>
          <NavLeftGuide forYouRoute={forYouRoute} setForYou={setForYou} />
          <div className="min-h-max w-full">
            <p
              className={`mt-2 text-[14px] ${
                dark ? "text-white " : "text-textNav"
              } font-bold`}
            >
              FOLLOWING
            </p>
            {!localRoute && (
                  <>
                    <div className="min-h-max w-full flex-col gap-4 font-bold text-textNav">
                      {data?.pages.map((page, index) => (
                        <div
                          key={index}
                          className={`${
                            dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                          } `}
                        >
                          {page.allCommunities.map(
                            (community: Following_commmunity) => (
                              <Link
                              key={community.community_id}  
                              href={`/pages/community/${community.community_id}`}
                                className={`${
                                  dark
                                    ? "hover:bg-gray-800"
                                    : "hover:bg-gray-200"
                                }  flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2`}
                              >
                                <div className="mr-2 h-[36px] min-h-[36px] w-[36px] min-w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
                                  <Image
                                    src={`${
                                      community.community_icon || placeholder
                                    }`}
                                    alt="Community Image Placeholder"
                                    width={36}
                                    height={36}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-normal">
                                    {community.community_name}
                                  </p>
                                </div>
                              </Link>
                            ),
                          )}
                        </div>
                      ))}
                    </div>

                  </>
            )}
            {!!localRoute && (
              <>
                <div className="min-h-max w-full flex-col gap-4 font-bold text-textNav">
                  {localFollowing.map((page, index) => (
                    <div
                      key={index}
                      className={`${
                        dark
                          ? "text-white hover:bg-gray-800"
                          : "hover:bg-gray-200"
                      } `}
                    >
                      <Link
                        href={`/pages/community/${page.id}`}
                        className="flex items-center border-b-[1px] border-solid border-sp-purpleBright2 p-2"
                      >
                        <div className="mr-2 h-[36px] min-h-[36px] w-[36px] min-w-[36px] overflow-hidden rounded-full border-[1px] border-solid border-sp-purpleBright2">
                          <Image
                            src={`${page.url_icon || placeholder}`}
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
            </div>
          </div>
      </PlaceholderProps>
  );
};

export default CommunityLeftGuide;
