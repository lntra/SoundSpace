"use client";

import useSessionData from "~/app/hooks/useSessionData";
import CommunityLeftGuide from "../molecules/communityLeftGuide";
import CommunityRightGuide from "../molecules/communityRightGuide";
import DestaquesCommunity from "../atoms/destaquescommunity";
import Posts from "./posts";
import { type UUID } from "crypto";
import HighlightsNavTags from "../molecules/highlightsNavTags";
import { useState } from "react";

interface CommunityPostsSectionProps {
  type: string;
  id?: UUID;
  name?: string;
  description?: string;
  rules?: string[];
  links?: string[];
  dark: boolean;
}

const CommunityPostsSection: React.FC<CommunityPostsSectionProps> = ({
  dark,
  type,
  id,
  name,
  description,
  rules,
  links,
}) => {
  const { data, isLoading, error } = useSessionData();

  const [tags, setTags] = useState("");

  const [search, setSearch] = useState("Trending");

  const [forYouRoute, setForYouRoute] = useState(false);

  const handleFilterTagClick = (tagText: string) => {
    setTags(tagText);
  };

  return (
    <>
      <div className="grid-rows-auto grid w-[100%] grid-cols-10">
        <div className="grid-rows-auto col-start-3 col-end-9 row-start-1 row-end-1 grid grid-cols-12">
          <div className="col-start-1 col-end-12 md:col-start-1 md:col-end-12 lg:col-start-2 lg:col-end-12">
            <DestaquesCommunity
              dark={dark}
              search={search}
              setSearch={setSearch}
              position="mt-1"
            />
          </div>
        </div>
        <div className="col-start-3 row-start-1 row-end-1"></div>
        <div className="col-span-10 row-start-2 row-end-2 grid grid-cols-10 grid-rows-1">
          <div className="sticky top-[20%] col-start-1 col-end-4 mb-3 justify-center self-start lg:col-start-1 lg:col-end-3 flex">
              <CommunityLeftGuide
                dark={dark}
                forYouRoute={forYouRoute}
                setForYou={setForYouRoute}
                userId={data?.user.id as UUID}
              />
          </div>
          <div className="col-start-1 col-end-12 sm:col-start-1 sm:col-end-12 md:col-start-2 md:col-end-10 lg:col-start-3 lg:col-end-9">
            <Posts
              dark={dark}
              forYouRoute={forYouRoute}
              search={search}
              setSearch={setSearch}
              tags={tags}
              id={id}
              tagsState={handleFilterTagClick}
            />
          </div>
          <div className="sticky top-[20%] col-start-9 col-end-11 mb-3 flex justify-center self-start">
            {type == "home" ? (
              <div className="hidden max-h-[567px] min-h-[567px] w-[18vw] text-textNav lg:block">
                <HighlightsNavTags
                  dark={dark}
                  tags={tags}
                  type={type}
                  tagsState={handleFilterTagClick}
                />
              </div>
            ) : (
              <CommunityRightGuide
                name={name}
                description={description}
                rules={rules}
                links={links}
                dark={dark}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPostsSection;
