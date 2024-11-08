"use client";

import RejectedPage from "~/app/_components/organisms/rejectedPage";
import LoadingPage from "~/app/_components/organisms/loadingPage";
import { api } from "~/trpc/react";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CardsDisplay from "../molecules/cardsDisplay";
import { type Communities } from "~/lib/definitions";
import { type UUID } from "crypto";
import { useRouter } from "next/navigation";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface DisplaySectionsProps {
  topics: string | undefined;
  current: number;
  dark: boolean;
}

const getFollowedCommunities = (): Communities[] => {
  const storedFollowedCommunities = localStorage.getItem("followedCommunities");
  return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const DisplaySections = ({ topics, current, dark }: DisplaySectionsProps) => {
  const router = useRouter();

  const [communities, setCommunities] = useState<Communities[]>([]);

  const [followedCommunities, setFollowedCommunities] = useState<Communities[]>(
    () => getFollowedCommunities(),
  );

  useEffect(() => {
    if (followedCommunities) {
      localStorage.setItem(
        "followedCommunities",
        JSON.stringify(followedCommunities),
      );
      router.refresh();
    }
  }, [followedCommunities]);

  const { data, isLoading, error } = api.community.getAllCommunity.useQuery({
    current: current,
    tag: topics,
  });

  useEffect(() => {
    if (data) {
      setCommunities(data.allCommunities);
    }
  }, [data, followedCommunities]);

  const handleFollow = (e: Communities) => {
    setFollowedCommunities([...followedCommunities, e]);
  };

  const handleUnfollow = (e: UUID) => {
    setFollowedCommunities(
      followedCommunities.filter(
        (followedCommunity) => followedCommunity.id !== e,
      ),
    );
  };

  if (error && communities.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
        <RejectedPage />
      </div>
    );
  }

  return (
    <>
      <div className={`grid-rows-auto grid w-full grid-cols-12 gap-3 pb-4`}>
        {communities.map((community, index) => (
          <CardsDisplay
            dark={dark}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
            followedCommunities={followedCommunities}
            key={community.id}
            data={community}
          ></CardsDisplay>
        ))}
      </div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[0.01]">
          <LoadingPage />
        </div>
      )}
    </>
  );
};

export default DisplaySections;
