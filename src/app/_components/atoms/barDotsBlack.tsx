import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import PlaceholderProps from "../molecules/placeholderProps";
import { type UUID } from "crypto";
import useSessionData from "~/app/hooks/useSessionData";
import FollowListSelect from "../molecules/followlistSelect";
import { type Posts } from "~/lib/definitions";

interface Blocked {
  userId: UUID;
  userName?: string;
}

interface BarDotsBlackProps {
  options: string[];
  user_id: UUID;
  post_id: UUID;
  setBlockedUsers: Dispatch<SetStateAction<Blocked[]>> | undefined;
  setSavedUsers: Dispatch<SetStateAction<Posts[]>>;
  isAuthor: boolean;
  handleClickSelect: (e: string) => void;
}

const BarDotsBlack = ({
  options,
  user_id,
  post_id,
  isAuthor,
  handleClickSelect,
  setSavedUsers,
}: BarDotsBlackProps) => {
  const [dots, setDots] = useState(false);
  const dropdownState = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const { data } = useSessionData();

  const handleClick = () => {
    setDots(!dots);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownState.current &&
      !dropdownState.current.contains(e.target as Node) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target as Node)
    ) {
      setDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  options = options.sort();

  const handleClickSelectDots = (e: string) => {
    if (e !== "Share") {
      handleClickSelect(e);
    } else {
      handlePopUp();
    }
    setDots(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handlePopUp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative flex">
        <button className="w-full" onClick={handleClick} ref={dropdownState}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="1.79034" cy="2" rx="1.79034" ry="2" fill="black" />
            <ellipse cx="8.05621" cy="2" rx="1.79034" ry="2" fill="black" />
            <ellipse cx="14.3226" cy="2" rx="1.79034" ry="2" fill="black" />
          </svg>
        </button>

        <div
          className={`dropdown  ${dots ? "dropdown-enter" : "dropdown-exit"}`}
        >
          {dots && (
            <div
              ref={dropdownMenuRef}
              className={`absolute left-[-15px] mt-2 flex w-48 rounded-full text-black shadow-lg `}
            >
              <PlaceholderProps className="flex w-full">
                <ul className="w-full self-start rounded-lg bg-white text-lg">
                  {options.map((e, index) => (
                    <li
                      key={index}
                      onClick={() => handleClickSelectDots(e)}
                      className={`flex justify-start px-4 py-2 ${
                        index < options.length - 1
                          ? "border-b-[1px] border-solid border-sp-purpleBright2"
                          : ""
                      } cursor-pointer hover:bg-gray-200`}
                    >
                      <div className="flex items-center justify-center align-middle">
                        {!isAuthor && index === 0 && (
                          <>
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 26 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM12 6C13.3 6 14.5 6.4 15.5 7.1L7.1 15.5C6.4 14.5 6 13.3 6 12C6 8.7 8.7 6 12 6ZM12 18C10.7 18 9.5 17.6 8.5 16.9L16.9 8.5C17.6 9.5 18 10.7 18 12C18 15.3 15.3 18 12 18Z"
                                fill="#53337B"
                              />
                            </svg>
                          </>
                        )}
                        {!!isAuthor && index === 0 && (
                          <>
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.2 7.2L17 5L12.1 10L7.2 5L5 7.2L10 12.1L5 17L7.2 19.2L12.1 14.2L17 19.2L19.2 17L14.2 12.1L19.2 7.2Z"
                                fill="#53337B"
                              />
                            </svg>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 2 36 35"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 6.25V10.75H19.5L15 6.25Z"
                                fill={`#53337B`}
                              />
                              <path
                                d="M19.5 12.25H13.5V6.25H6V24.25H19.5V12.25Z"
                                fill={`#53337B`}
                              />
                              <path
                                d="M25.5 12.25V16.75H30L25.5 12.25Z"
                                fill={`#53337B`}
                              />
                              <path
                                d="M24 12.25H21V25.75H16.5V30.25H30V18.25H24V12.25Z"
                                fill={`#53337B`}
                              />
                            </svg>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <svg
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14 7H8.9C8.9 7 4 7 4 12C4 15.9 7 20 7 20C7 20 5.3 13 8.8 13H14V16L20 10L14 4V7Z"
                                fill="#53337B"
                              />
                            </svg>
                          </>
                        )}
                        <p className="px-1 py-2 text-center">{e}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </PlaceholderProps>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-opacity duration-1000 ease-in-out">
          <div className="relative w-80 rounded-lg bg-white p-6 opacity-100 transition-opacity duration-1000 ease-in-out">
            <button
              onClick={handlePopUp}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.8332 4.1665L19.7915 4.17692L12.4998 11.4582L5.20817 4.17692L4.1665 4.1665V5.20817L11.4582 12.4998L4.1665 19.7915V20.8332H5.20817L12.4998 13.5415L19.7915 20.8332H20.8332V19.7915L13.5415 12.4998L20.8332 5.20817V4.1665Z"
                  style={{ fill: "var(--path-fill-color, #6232DA)" }}
                />
              </svg>
            </button>
            <h2 className="mb-4 text-xl font-bold text-gray-500">
              Select an User
            </h2>
            <div className="max-h-[380px] overflow-y-auto">
              {data && (
                <FollowListSelect
                  setIsOpen={setIsOpen}
                  followUser={data.user.id as UUID}
                />
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handlePopUp}
                className="rounded bg-sp-purpleBright2 px-4 py-2 text-white hover:bg-sp-accent hover:text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BarDotsBlack;
