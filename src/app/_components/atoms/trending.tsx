import * as React from "react";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import PlaceholderProps from "../molecules/placeholderProps";

interface TrendingProps {
  topics: string[];
  position?: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  dark: boolean;
}

const Trending: React.FC<TrendingProps> = ({
  topics,
  position,
  setSearch,
  search,
  dark,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [trending, setTrending] = useState(false);
  const dropdownState = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setRotationAngle(!trending ? -180 : 0);
    setTrending(!trending);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownState.current &&
      !dropdownState.current.contains(e.target as Node) &&
      dropdownMenuRef.current &&
      !dropdownMenuRef.current.contains(e.target as Node)
    ) {
      setRotationAngle(0);
      setTrending(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const svgStyle = {
    transform: `rotate(${rotationAngle}deg)`,
    transition: "transform 0.15s linear",
  };

  topics = topics.sort();

  const visibleTopics = topics.filter((topic) => topic !== search);

  const handleClickSelect = (e: string) => {
    setSearch(e);
    setTrending(false);
    setRotationAngle(0);
  };

  return (
    <div className="relative flex">
      <button className="p-2" onClick={handleClick} ref={dropdownState}>
        <svg
          style={svgStyle}
          width="21"
          height="14"
          viewBox="0 0 21 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z"
            fill={`#6232DA`}
          />
        </svg>
      </button>

      <h1
        className={`p-2 text-[28px] font-bold ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {search}
      </h1>

      <div
        className={`dropdown  ${trending ? "dropdown-enter" : "dropdown-exit"}`}
      >
        {trending && (
          <div
            ref={dropdownMenuRef}
            className={`absolute left-[-10px] z-10 mt-2 w-64 rounded-full shadow-lg ${
              dark ? "bg-gray-900 text-white" : "bg-white text-black"
            } text-black`}
          >
            <PlaceholderProps dark={dark}>
              <ul
                className={`text-lg ${
                  dark ? "bg-gray-950 text-white" : "bg-white text-black"
                } rounded-lg`}
              >
                {visibleTopics.map((e, index) => (
                  <li
                    key={index}
                    onClick={() => handleClickSelect(e)}
                    className={`px-4 py-2 ${
                      index < visibleTopics.length - 1
                        ? "border-b-[1px] border-solid border-sp-purpleBright2"
                        : ""
                    } ${
                      dark ? "hover:bg-gray-800" : "hover:bg-gray-200 "
                    } cursor-pointer`}
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </PlaceholderProps>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
