import { type UUID } from "crypto";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


interface TagsnewsProps {
  time?: Date;
  userId?: UUID;
  style?: string;
  textStyle?: string;
  text?: string;
  img?: string;
  home?: boolean;
  disableImg?: boolean;
  dark?: boolean;
}

const UserPost: React.FC<TagsnewsProps> = ({
  dark,
  disableImg,
  home,
  time,
  userId,
  style,
  textStyle,
  text,
  img,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {!disableImg && (
        <>
          <div
            className={`${style != null ? style : "h-6 w-6"} ${
              dark ? "text-white" : "text-black"
            } flex-shrink-0 rounded-full bg-gray-900`}
          >
            <img
              src={img}
              className="h-full w-full rounded-full object-cover"
              alt=""
            />
          </div>
          <div
            className={`flex flex-col ${
              textStyle != null ? textStyle : "text-xs font-bold xl:text-xs"
            } lato-font text-gray-900`}
          >
            {text && (
              <span
                className={`${
                  dark ? "text-white" : "text-black"
                } whitespace-pre-wrap`}
              >
                {text}
              </span>
            )}
            {time && (
              <span
                className={`text-start text-[12px] ${
                  home ? (dark ? "text-gray-400" : "text-textNav") : ""
                }`}
              >
                {dayjs(time).fromNow()}
              </span>
            )}
          </div>
        </>
      )}
      {!!disableImg && (
        <div
          className={`flex flex-col  ${dark ? "text-white" : "text-black"} ${
            textStyle != null ? textStyle : "text-xs font-bold xl:text-xs"
          } lato-font text-gray-900`}
        >
          {text && (
            <span
              className={`${
                dark ? "text-white" : "text-black"
              } whitespace-pre-wrap`}
            >
              {text}
            </span>
          )}
          {time && (
            <span
              className={`text-start text-[14px] ${home ? "text-textNav" : ""}`}
            >
              {dayjs(time).fromNow()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPost;
