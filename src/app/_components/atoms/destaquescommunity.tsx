"use client";

import { type Dispatch, type SetStateAction } from "react";
import Trending from "./trending";

interface DestaquesCommunityProps {
  position: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  dark: boolean;
}

const DestaquesCommunity: React.FC<DestaquesCommunityProps> = ({
  search,
  setSearch,
  position,
  dark,
}) => {
  return (
    <>
      <div className="ml-3 flex w-[100%]">
        <Trending
          dark={dark}
          search={search}
          setSearch={setSearch}
          position={`${position}`}
          topics={["Trending", "Recent", "Hot Topics", "Top Rated"]}
        ></Trending>
      </div>
    </>
  );
};

export default DestaquesCommunity;
