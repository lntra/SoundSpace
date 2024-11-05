import { type UUID } from "crypto";
import { api } from "~/trpc/react";
import { type Communities, type Following_commmunity } from "~/lib/definitions";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import NavLeftGuide from "../atoms/navLeftGuide";
import PlaceholderProps from "./placeholderProps";
import Link from "next/link";
import UserPost from "./UserPost";
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
          <p
              className={`mt-2 text-[14px] ${
                dark ? "text-white " : "text-textNav"
              } font-bold`}
            >
              FOLLOWING
          </p> 
          {!localRoute && (
              <>
                {localFollowing.length > 0 ? (
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
                                  <img
                                    src={`${
                                      community.community_icon
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
                ) : (
                  <div className="flex flex-col gap-1 p-3">
                    <h1 className="self-center font-bold">Recommendations</h1>
                      <Link
                        href={`/pages/community/97f4d418-eb4a-425d-97d0-83f6acbc435a`}
                      >
                        <div
                          className={`${
                            dark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                          } flex items-center border-b-[1px] border-sp-purpleBright2 py-2 align-middle`}
                        >
                          <UserPost
                            dark={dark}
                            img="https://fastly.picsum.photos/id/446/3072/1728.jpg?hmac=62VykY0FNeXxvrUhPIGiucHvYI1qd_VzMTmk98U-D5Y"
                            textStyle="text-base"
                            style="w-8 h-8 mr-2 rounded-full"
                            text="The Band, from Outer Space"
                            userId="97f4d418-eb4a-425d-97d0-83f6acbc435a"
                          />
                          <div className="hidden xl:block">
                            <Highlights text="HOT" />
                          </div>
                        </div>
                      </Link>
                  </div>
                )}
              </>
          )}
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
          </div>
        </PlaceholderProps>
      </div>
  );
};

export default CommunityLeftGuide;
