import Bandfoto from "../assets/bandfoto.png";
import BarHeart from "../atoms/barHeart";
import BarComments from "../atoms/barComments";
import BarDots from "../atoms/BarDots";
import { type UUID } from "crypto";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CommunityPostProps {
  color?: string;
  pressed?: string;
  title: string;
  content?: string;
  date: Date;
  user_id: UUID;
  post_id: UUID;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  title,
  content,
  date,
  user_id,
  post_id,
}) => {
  return (
    <>
      <div className="mb-3">
        <div className="grid h-52 w-[100%] grid-cols-sp grid-rows-2">
          <div className="col-start-1 col-end-1 row-start-1 row-end-3 flex w-14 items-start rounded-l-[20px] bg-sp-purple">
            <div className="flex h-[100%] flex-wrap items-start justify-center">
              <div className="mt-4 text-white">
                <div className="self-center justify-self-center text-center">
                  <BarHeart color="white" pressed="none"></BarHeart>
                </div>
                <p className="w-[100%] text-center text-base font-semibold">
                  34.4K
                </p>
                <div className="mt-1 text-center">
                  <BarComments color="white"></BarComments>
                </div>
                <p className="w-[100%] text-center text-base font-semibold">
                  303
                </p>
              </div>
              <div className="mb-4 self-end justify-self-end text-end">
                <BarDots></BarDots>
              </div>
            </div>
          </div>
          <div className="grid-cols-auto col-start-2 col-end-4 row-span-2 grid w-[100%] grid-rows-6 gap-4 rounded-br-[20px] rounded-tr-[20px] border border-sp-purpleBright2 bg-white">
            <div className="col-start-1 col-end-1 row-start-2 row-end-6 self-center">
              <a href="#">
                <img className="ml-5 w-52 rounded-[20px]" src={Bandfoto.src} />
              </a>
            </div>
            <div className="col-start-2 col-end-2 row-start-2 row-end-2">
              <div className="flex items-center">
                <span className="mr-1 h-8 w-8 rounded-full bg-black"></span>
                <p className="text-black">
                  To community <strong>@Jazz Lounge</strong>
                </p>
              </div>
            </div>
            <div className="col-start-2 col-end-2 row-start-3 row-end-6 flex flex-wrap text-black xl:pr-32">
              <a href="#" className="flex items-center justify-center">
                <p className="text-center text-2xl font-semibold">{title}</p>
              </a>
              <div className="self-end text-end">
                <p className="text-lg">
                  Posted by{" "}
                  <a href="" className="font-bold">
                    {user_id}
                  </a>{" "}
                  {dayjs(date).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPost;
