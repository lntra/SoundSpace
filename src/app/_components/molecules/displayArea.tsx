"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DisplaySections from "../atoms/displaySections";
import { useState } from "react";

dayjs.extend(relativeTime);

interface DisplayAreaProps {
  topics: (undefined | string)[];
  dark: boolean;
}

const DisplayArea = ({ topics, dark }: DisplayAreaProps) => {
  const [current, setCurrent] = useState(1);

  const handleClick = () => {
    setCurrent(current + 1);
  };

  return (
    <>
      {topics.map((areas, index) => (
        <div key={index} className="col-start-3 col-end-11 row-span-1">
          <h2 className="px-4 py-4 text-2xl font-bold">
            {areas === undefined
              ? "For You ⭐"
              : `Best of ${areas.replace(":", " ")}`}
          </h2>

          <DisplaySections
            dark={dark}
            current={current}
            topics={`${areas?.split(":")[0]}`}
          ></DisplaySections>
          <div className="flex w-full justify-center">
            <div onClick={handleClick}>
              <p className="cursor-pointer rounded-3xl bg-sp-purple p-2 text-base font-bold text-white transition-all duration-200 hover:bg-sp-accent  hover:text-black">
                Show More
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DisplayArea;
