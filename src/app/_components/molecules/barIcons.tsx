"use client";

import Link from "next/link";
import DropdownBar from "../atoms/dropdown";
import SearchBar from "../atoms/search";
import LogoSoundSpace from "../atoms/soundspacelogo";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";
import { type UUID } from "crypto";

interface BarComponentsProps {
  text: Dispatch<SetStateAction<string>>;
  value: string;
  change: (event: boolean) => void;
  name: string;
  image?: string;
  id: UUID;
  dark: boolean;
}

const BarComponents = ({
  dark,
  text,
  value,
  change,
  name,
  image,
  id,
}: BarComponentsProps) => {
  const [bar, setBar] = useState(false);

  const [transition, setTransition] = useState(false);

  const handleTransitionEnd = () => {
    setBar(!bar);
    text("");
  };

  const handleSearchClick = () => {
    setTransition(!transition);
    change(false);
  };

  const handleTextChange = (event: any) => {
    const newValue = event.target.value;
    text(newValue);
  };

  useEffect(() => {
    if (value === "") {
      change(false);
    } else {
      change(true);
    }
  }, [value]);

    const shouldRender =
    (!bar && !transition) || (bar && value === "" && !transition);
    return (
    <div
      className={`relative z-50 flex h-[80px] flex-row justify-between px-4 py-4 font-[Lato] ${
        dark ? "bg-gray-950 text-white" : "bg-white text-black"
      } overflow-hidden`}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        className={clsx(
          "absolute inset-0 flex justify-between transition-all duration-300",
          transition ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="grid flex-grow grid-cols-12 items-center align-middle">
          <div
            className={`border ${
              dark ? "border-gray-600" : "border-sp-purpleBright2"
            } col-start-2 col-end-12 flex-grow rounded-3xl p-1`}
          >
            <div className="flex h-12 items-center justify-center">
              <textarea
                placeholder="Search..."
                value={value}
                onChange={handleTextChange}
                className={`mx-4 h-8 w-full resize-none text-2xl outline-none ${
                  dark ? "bg-gray-950 text-white" : "bg-white text-black"
                }`}
              />
            </div>
          </div>
          <button onClick={handleSearchClick} className="ml-4 cursor-pointer">
            <svg
              width="36"
              height="36"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.8332 4.1665L19.7915 4.17692L12.4998 11.4582L5.20817 4.17692L4.1665 4.1665V5.20817L11.4582 12.4998L4.1665 19.7915V20.8332H5.20817L12.4998 13.5415L19.7915 20.8332H20.8332V19.7915L13.5415 12.4998L20.8332 5.20817V4.1665Z"
                style={{ fill: dark ? "#A9FB1A" : "#6232DA" }}
              />
            </svg>
          </button>
        </div>
      </div>

      {shouldRender && (
        <>
          <DropdownBar dark={dark} id={id} name={name} image={image} />
          <Link href="/pages/home" prefetch={false}>
            <LogoSoundSpace dark={dark} />
          </Link>
          <SearchBar dark={dark} click={handleSearchClick} />
        </>
      )}
    </div>
  );
};

export default BarComponents;
