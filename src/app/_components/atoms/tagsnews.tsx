import { type UUID } from "crypto";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UserPost from "../molecules/UserPost";

dayjs.extend(relativeTime);

interface TagsnewsProps {
  time: Date;
  tag: string;
  userId: UUID;
  dark: boolean;
  userName: string | undefined;
}

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


const Tagsnews: React.FC<TagsnewsProps> = ({
  time,
  tag,
  userId,
  dark,
  userName,
}) => {
  return (
    <>
      <div className="mb-2.5 flex items-center justify-start gap-1">
        <div
          className={`lato-font text-xs font-bold ${
            dark ? "bg-[#a585cc] text-white" : "bg-sp-purple text-white"
          } rounded-full px-2 py-1`}
        >
          {tag}
        </div>
        <UserPost
          text={`${userName ? `by ${userName}` : ""}`}
          dark={dark}
          disableImg={true}
          time={time}
          userId={userId}
        ></UserPost>
      </div>
    </>
  );
};

export default Tagsnews;
