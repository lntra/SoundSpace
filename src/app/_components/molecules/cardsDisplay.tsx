import { type UUID } from "crypto";
import Link from "next/link";
import { useEffect } from "react";
import { type Communities } from "~/lib/definitions";

interface CardsDisplayProps {
  data: Communities;
  followedCommunities: Communities[];
  handleFollow: (community: Communities) => void;
  handleUnfollow: (id: UUID) => void;
  dark: boolean;
}

const CardsDisplay = ({
  data,
  followedCommunities,
  handleFollow,
  handleUnfollow,
  dark,
}: CardsDisplayProps) => {
  let isFollowed = followedCommunities.some(
    (followedCommunity) => followedCommunity.id === data.id,
  );

  useEffect(() => {
    isFollowed = followedCommunities.some(
      (followedCommunity) => followedCommunity.id === data.id,
    );
  }, [followedCommunities]);

  return (
    <div
      className={`col-span-12 row-span-1 p-4 sm:col-span-4 ${
        dark ? "bg-gray-950 text-white" : "bg-white text-black"
      } rounded-3xl border border-sp-purpleBright2`}
    >
      <div className="flex flex-col">
        <div className="flex flex-grow flex-row flex-nowrap justify-between">
          <Link href={`/pages/community/${data.id}`}>
            <div className="flex cursor-pointer items-center gap-2">
              <img
                className="h-12 w-12 rounded-3xl object-cover"
                src={`${data.url_icon}`}
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{data.name}</h3>
              </div>
            </div>
          </Link>
          {!isFollowed ? (
            <div
              onClick={() => handleFollow(data)}
              className="flex items-center hover:cursor-pointer"
            >
              <p className="cursor-pointer rounded-3xl bg-sp-purple px-2 py-2 text-base font-bold text-white transition-all duration-200 hover:bg-sp-accent hover:text-black">
                Follow
              </p>
            </div>
          ) : (
            <div
              onClick={() => handleUnfollow(data.id)}
              className="flex items-center hover:cursor-pointer"
            >
              <p className="cursor-pointer rounded-3xl bg-sp-purple px-2 py-2 text-base font-bold text-white transition-all duration-200 hover:bg-sp-accent hover:text-black">
                Unfollow
              </p>
            </div>
          )}
        </div>
        <Link href={`/pages/community/${data.id}`}>
          <div className="flex flex-grow cursor-pointer">
            <div className="line-clamp-2">
              <p className="line-clamp-2">{data.description}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CardsDisplay;
