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
       
          <div className="col-start-1 col-end-12 sm:col-start-1 sm:col-end-12 md:col-start-2 md:col-end-10 lg:col-start-3 lg:col-end-9">
            <Posts
              dark={dark}
              forYouRoute={forYouRoute}
              search={search}
              setSearch={setSearch}
              tags={tags}
              id={id}
              tagsState={handleFilterTagClick}
            ></Posts>
          </div>

        </div>
    </>
  );
};

export default CommunityPostsSection;
